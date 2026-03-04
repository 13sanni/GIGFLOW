import mongoose from "mongoose";
import Bid from "../models/bid.model.js";
import Gig from "../models/gig.model.js";
const toObjectId = (id) => new mongoose.Types.ObjectId(id);
export const getMyGigsActivity = async (userId) => {
    const ownerId = toObjectId(userId);
    return Gig.aggregate([
        { $match: { owner: ownerId } },
        {
            $lookup: {
                from: "bids",
                localField: "_id",
                foreignField: "gig",
                as: "bids",
            },
        },
        {
            $project: {
                _id: 0,
                gigId: "$_id",
                title: 1,
                description: 1,
                bidsCount: { $size: "$bids" },
                createdAt: 1,
            },
        },
        { $sort: { createdAt: -1 } },
    ]);
};
export const getMyBidsActivity = async (userId) => {
    const freelancerId = toObjectId(userId);
    return Bid.aggregate([
        { $match: { freelancer: freelancerId } },
        {
            $lookup: {
                from: "gigs",
                localField: "gig",
                foreignField: "_id",
                as: "gig",
            },
        },
        { $unwind: "$gig" },
        {
            $project: {
                _id: 0,
                bidId: "$_id",
                gigId: "$gig._id",
                gigTitle: "$gig.title",
                amount: 1,
                status: 1,
                createdAt: 1,
            },
        },
        { $sort: { createdAt: -1 } },
    ]);
};
export const getBiddedGigsActivity = async (userId) => {
    const freelancerId = toObjectId(userId);
    return Bid.aggregate([
        { $match: { freelancer: freelancerId } },
        { $sort: { createdAt: -1 } },
        {
            $lookup: {
                from: "gigs",
                localField: "gig",
                foreignField: "_id",
                as: "gig",
            },
        },
        { $unwind: "$gig" },
        {
            $project: {
                _id: 0,
                gigId: "$gig._id",
                title: "$gig.title",
                myBidAmount: "$amount",
                bidStatus: "$status",
            },
        },
    ]);
};
//# sourceMappingURL=activity.service.js.map