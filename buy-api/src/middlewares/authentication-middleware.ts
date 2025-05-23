import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authenticationMiddleware: any = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId?: number;
    };
    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
