import type {  Request, Response } from "express";
import Bid from "../models/bid.model.js";
import Gig from "../models/gig.model.js";
export const createBid =async (req:Request,res:Response) => {
    try{
        const bid = req.body;
        if(!bid || !bid.proposal || !bid.amount || !bid.gigId){
            return res.status(400).json({success:false,message:"data is missing"});
        }   
        const gigId = bid.gigId;
        const freelancerId = (req as any).user.userId;
        const gig = await Gig.findById(bid.gigId);
        if(!gig){
            return res.status(404).json({success:false,message:"gig not found"});
        }
        if (gig.owner.toString() === freelancerId) {
  return res
    .status(403)
    .json({ success: false, message: "cannot bid on your own gig" });
}

        let existingBid = await Bid.findOne({ gig: gigId, freelancer: freelancerId });
        if(existingBid){
            return  res.status(409).json({success:false,message:"bid already placed"});
        }

        await Bid.create({
            proposal:bid.proposal,
            amount:bid.amount,  
            gig:bid.gigId,
            freelancer:freelancerId
        });
        return res.status(201).json({success:true,message:"bid placed successfully"});
    }catch(err){
        return res.status(500).json({success:false,message:"internal server error"});


    }
};