import type { Request, Response } from "express";
import Gig from "../models/gig.model.js";
import { AppError } from "../utils/appError.js";

export const createGig = async (req: Request, res: Response) => {
  const { title, description, budget } = req.body;
  const userId = (req as any).user.userId;

  const gig = await Gig.create({
    title,
    description,
    budget,
    owner: userId
  });

  return res.status(201).json({
    success: true,
    message: "gig created successfully",
    gig
  });
};

// get open gigs (public)
export const getGigs = async (req: Request, res: Response) => {
  const gigs = await Gig.find({ status: "open" })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    gigs
  });
};
