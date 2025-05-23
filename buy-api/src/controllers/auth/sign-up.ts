import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { prisma } from "../../db";

export const signup: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ message: "Username, email, and password are required" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Invalid email format" });
    return;
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
    return;
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Check if username is taken (if usernames should be unique)
    const existingUsername = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUsername) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12); // Use higher salt rounds

    // Create new user - correct Prisma syntax
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Check JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET environment variable is not set");
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: newUser.id, // This will be a number based on your schema
      },
      jwtSecret,
      { expiresIn: "24h" } // Add expiration
    );

    // Remove password from response - correct destructuring for Prisma
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      user: userWithoutPassword,
      token: `Bearer ${token}`, // Add Bearer prefix
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Handle Prisma unique constraint errors
    if (error.code === "P2002") {
      res.status(400).json({ message: "Email or username already exists" });
      return;
    }

    res.status(500).json({
      message: "Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
