import type { Request, Response } from "express";
import mongoose from "mongoose";
import Bid from "../models/bid.model.js";
import Gig from "../models/gig.model.js";

//create bid
export const createBid = async (req: Request, res: Response) => {
    try {
        const bid = req.body;
        if (!bid || !bid.proposal || !bid.amount || !bid.gigId) {
            return res.status(400).json({ success: false, message: "data is missing" });
        }
        const gigId = bid.gigId;
        const freelancerId = (req as any).user.userId;
        const gig = await Gig.findById(bid.gigId);
        if (!gig) {
            return res.status(404).json({ success: false, message: "gig not found" });
        }
        if (gig.owner.toString() === freelancerId) {
            return res
                .status(403)
                .json({ success: false, message: "cannot bid on your own gig" });
        }

        let existingBid = await Bid.findOne({ gig: gigId, freelancer: freelancerId });
        if (existingBid) {
            return res.status(409).json({ success: false, message: "bid already placed" });
        }

        await Bid.create({
            proposal: bid.proposal,
            amount: bid.amount,
            gig: bid.gigId,
            freelancer: freelancerId
        });
        return res.status(201).json({ success: true, message: "bid placed successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "internal server error" });


    }
};


//get bids for gig
export const getBidsForGig = async (req: Request, res: Response) => {
    try {
        const gigId = req.params.gigId;
        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({ success: false, message: "gig not found" });
        }
        if (gig.owner.toString() !== (req as any).user.userId) {
            return res.status(403).json({ success: false, message: "unauthorized access to bids" });
        }
        let bids = await Bid.find({ gig: gigId as any });
        return res.status(200).json({ success: true, bids });
    } catch (err) {
        return res.status(500).json({ success: false, message: "internal server error" });
    }
}

//hire bid
let session: mongoose.ClientSession | null = null;

export const hireBid = async (req: Request, res: Response) => {
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const { bidId } = req.params;
        const userId = (req as any).user.userId;
        const bid = await Bid.findById(bidId).session(session);
        if (!bid) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ success: false, message: "bid not found" });
        }
        const gig = await Gig.findById(bid.gig).session(session);
        if (!gig) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ success: false, message: "gig not found" });
        }
        if (gig.owner.toString() !== userId) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ success: false, message: "not authorized to hire" });
        }

        if (gig.status !== "open") {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: "gig already closed" });
        } bid.status = "accepted";
        await bid.save({ session });
        await Bid.updateMany(
            {
                gig: bid.gig,
                _id: { $ne: bid._id }
            },
            { status: "rejected" },
            { session }
        );
        gig.status = "closed";
        await gig.save({ session });
        return res.status(200).json({
            success: true,
            message: "freelancer hired successfully"
        })
    } catch (err) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }

        return res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
}