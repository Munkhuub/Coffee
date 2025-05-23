import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Add this import
import { RequestHandler } from "express";
import { prisma } from "../../db";

export const signin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  console.log("Signin attempt:", email);

  // Validate input
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      console.log("User not found");
      res.status(401).json({ message: "Username or password invalid" });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      console.log("Password mismatch");
      res.status(401).json({ message: "Username or password invalid" });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET not configured");
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    // Remove password from user object before sending response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Amjilttai signin",
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
