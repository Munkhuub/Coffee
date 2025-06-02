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

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //   res.status(400).json({ message: "Invalid email format" });
  //   return;
  // }

  try {
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const existingUsername = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUsername) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        profile: true,
        bankCard: true,
        donations: true,
      },
    });

    const jwtSecret = process.env.JWT_SECRET || "Save1234";
    if (!jwtSecret) {
      console.error("JWT_SECRET environment variable is not set");
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      jwtSecret
    );

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      user: userWithoutPassword,
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.error("Signup error:", error);

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
