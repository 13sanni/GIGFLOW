import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

import User from "../models/user.model.js";
import { AppError } from "../utils/appError.js";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name,
      email,
      password: hashedPassword
    });
  } catch (err: any) {
    if (err.code === 11000) {
      throw new AppError("Email already exists", 409);
    }
    throw err;
  }

  return res.status(201).json({
    success: true,
    message: "user created successfully"
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("user not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("invalid credentials", 401);
  }

  const secretKey = process.env.JWT_SECRET_KEY as string;

  const token = jwt.sign(
    { userId: user._id },
    secretKey,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    secure: false,
    httpOnly: true,
    sameSite: "strict"
  });

  return res.status(200).json({
    success: true,
    message: "login successful"
  });
};

// Logout user 
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false //make true later
  });

  return res.status(200).json({
    success: true,
    message: "logout successful"
  });
};

