import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../db";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: { email },
      include: {
        profile: true,
        bankCard: true,
        sentDonations: {
          include: {
            recipient: {
              include: { profile: true },
            },
          },
        },
        receivedDonations: {
          include: {
            donor: {
              include: { profile: true },
            },
          },
        },
      },
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

    const token = jwt.sign(
      {
        userId: user.id,
      },
      jwtSecret
    );

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
