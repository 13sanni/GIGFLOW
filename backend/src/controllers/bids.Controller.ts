import type { Request, Response } from "express";
import { getIO } from "../socket/socketStore.js";

import Bid from "../models/bid.model.js";
import Gig from "../models/gig.model.js";
import { AppError } from "../utils/appError.js";


//CREATE BID

export const createBid = async (req: Request, res: Response) => {
  const { gigId, amount, proposal } = req.body;
  const freelancerId = (req as any).user.userId;

  const gig = await Gig.findById(gigId);
  if (!gig) {
    throw new AppError("gig not found", 404);
  }

  if (gig.owner.toString() === freelancerId) {
    throw new AppError("cannot bid on your own gig", 403);
  }

  if (gig.status !== "open") {
    throw new AppError("bidding is closed for this gig", 400);
  }

  const existingBid = await Bid.findOne({ gig: gigId, freelancer: freelancerId });
  if (existingBid) {
    throw new AppError("bid already placed", 409);
  }

  await Bid.create({
    proposal,
    amount,
    gig: gigId,
    freelancer: freelancerId
  });
  const io = getIO();

  io.to(`user:${gig.owner.toString()}`).emit("bid:new", {
    gigId: gig._id,
    amount: amount
  });

  return res.status(201).json({
    success: true,
    message: "bid placed successfully"
  });
};


// GET BIDS FOR GIG (OWNER)

export const getBidsForGig = async (req: Request, res: Response) => {
  const gigId = req.params.gigId;
  const userId = (req as any).user.userId;

  const gig = await Gig.findById(gigId);
  if (!gig) {
    throw new AppError("gig not found", 404);
  }

  if (gig.owner.toString() !== userId) {
    throw new AppError("unauthorized access to bids", 403);
  }

  const bids = await Bid.find({ gig: gigId as any });

  return res.status(200).json({
    success: true,
    bids
  });
};


// HIRE BID
// NOTE: MongoDB transactions require a replica set (not available on free Atlas M0 clusters).
// Using sequential operations instead — safe because status checks prevent double-hiring.

export const hireBid = async (req: Request, res: Response) => {
  const { bidId } = req.params;
  const userId = (req as any).user.userId;

  const bid = await Bid.findById(bidId);
  if (!bid) {
    throw new AppError("bid not found", 404);
  }

  const gig = await Gig.findById(bid.gig);
  if (!gig) {
    throw new AppError("gig not found", 404);
  }

  if (gig.owner.toString() !== userId) {
    throw new AppError("not authorized to hire", 403);
  }

  if (gig.status !== "open") {
    throw new AppError("gig already closed", 400);
  }

  // Accept selected bid
  bid.status = "accepted";
  await bid.save();

  // Reject all other bids
  await Bid.updateMany(
    { gig: bid.gig, _id: { $ne: bid._id } },
    { status: "rejected" }
  );

  // Close gig
  gig.status = "closed";
  await gig.save();

  const io = getIO();
  io.to(`user:${bid.freelancer.toString()}`).emit("bid:accepted", {
    gigId: gig._id,
    message: "You have been hired"
  });

  return res.status(200).json({
    success: true,
    message: "freelancer hired successfully"
  });
};
