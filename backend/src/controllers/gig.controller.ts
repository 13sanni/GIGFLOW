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

// get open gigs
export const getGigs = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor as string | undefined;

    const query: any = { status: "open" };

    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    const gigs = await Gig.find(query)
     .sort({ createdAt: -1, _id: -1 })

      .limit(limit + 1); // fetch extra to detect hasMore

    const hasMore = gigs.length > limit;
    if (hasMore) gigs.pop();

    return res.status(200).json({
      success: true,
      gigs,
      nextCursor: gigs.length
        ? gigs[gigs.length - 1]!.createdAt
        : null,
      hasMore
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error"
    });
  }
};


// gig details
export const getGigById = async (req: Request, res: Response) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "gig not found"
      });
    }

    return res.status(200).json({
      success: true,
      gig
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error"
    });
  }
};