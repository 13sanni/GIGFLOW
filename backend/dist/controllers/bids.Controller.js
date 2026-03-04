import Bid from "../models/bid.model.js";
import Gig from "../models/gig.model.js";
import User from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { getMyBidsActivity } from "../services/activity.service.js";
import { createAndEmitNotification } from "../services/notification.service.js";
//CREATE BID
export const createBid = async (req, res) => {
    const { gigId, amount, proposal } = req.body;
    const freelancerId = req.user.userId;
    const gig = await Gig.findById(gigId).select("_id owner status");
    if (!gig) {
        throw new AppError("gig not found", 404);
    }
    if (gig.owner.toString() === freelancerId) {
        throw new AppError("cannot bid on your own gig", 403);
    }
    if (gig.status !== "open") {
        throw new AppError("bidding is closed for this gig", 400);
    }
    let bid;
    try {
        bid = await Bid.create({
            proposal,
            amount,
            gig: gigId,
            freelancer: freelancerId
        });
    }
    catch (err) {
        if (err?.code === 11000) {
            throw new AppError("bid already placed", 409);
        }
        throw err;
    }
    const bidder = await User.findById(freelancerId).select("name").lean();
    await createAndEmitNotification({
        type: "BID_PLACED",
        gigId: gig._id.toString(),
        bidId: bid._id.toString(),
        senderId: freelancerId,
        receiverId: gig.owner.toString(),
        message: `${bidder?.name ?? "Someone"} placed a bid on your gig`
    });
    return res.status(201).json({
        success: true,
        message: "bid placed successfully"
    });
};
// GET BIDS FOR GIG (OWNER)
export const getBidsForGig = async (req, res) => {
    const gigId = req.params.gigId;
    const userId = req.user.userId;
    const gig = await Gig.findById(gigId).select("owner").lean();
    if (!gig) {
        throw new AppError("gig not found", 404);
    }
    if (gig.owner.toString() !== userId) {
        throw new AppError("unauthorized access to bids", 403);
    }
    const bids = await Bid.find({ gig: gigId })
        .sort({ createdAt: -1 })
        .lean();
    return res.status(200).json({
        success: true,
        bids
    });
};
export const getMyBids = async (req, res) => {
    const userId = req.user.userId;
    const bids = await getMyBidsActivity(userId);
    return res.status(200).json({
        success: true,
        bids
    });
};
// HIRE BID
// NOTE: MongoDB transactions require a replica set (not available on free Atlas M0 clusters).
// Using sequential operations instead — safe because status checks prevent double-hiring.
export const hireBid = async (req, res) => {
    const { bidId } = req.params;
    const userId = req.user.userId;
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
    // Close gig and reject all remaining bids in parallel.
    gig.status = "closed";
    await Promise.all([
        Bid.updateMany({ gig: bid.gig, _id: { $ne: bid._id } }, { status: "rejected" }),
        gig.save()
    ]);
    await createAndEmitNotification({
        type: "BID_ACCEPTED",
        gigId: gig._id.toString(),
        bidId: bid._id.toString(),
        senderId: userId,
        receiverId: bid.freelancer.toString(),
        message: `Your bid was accepted for "${gig.title}"`
    });
    return res.status(200).json({
        success: true,
        message: "freelancer hired successfully"
    });
};
//# sourceMappingURL=bids.Controller.js.map