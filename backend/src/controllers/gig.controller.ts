import Gig from "../models/gig.model.js";
import type {  Request, Response } from "express";

export const createGig = async(req:Request,res:Response)=>{
    try{
    const gig = req.body;
    if(!gig || !gig.title || !gig.description || !gig.budget){
        return res.status(400).json({success:false,message:"data is missing"});
    }
    let userId = (req as any).user.userId;
    await Gig.create({
        title:gig.title,
        description:gig.description,
        budget:gig.budget,
        owner:userId
    })
    return res.status(201).json({success:true,message:"gig created successfully",
        owner:userId
    });
}catch(err){
    return res.status(500).json({success:false,message:"internal server error"});   
}
}

//get gigs
export const getGigs = async(req:Request,res:Response)=>{
    try{
        const gigs = await Gig.find({status:"open"}).sort({createdAt:-1});
        return res.status(200).json({success:true,gigs:gigs});
    }catch(err){
        return res.status(500).json({success:false,message:"internal server error"});
    }   
}