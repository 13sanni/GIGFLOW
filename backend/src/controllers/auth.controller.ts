
import User from "../models/user.model.js";
import { type Request, type Response } from "express";

export const registerUser = async (req:Request,res:Response)=>{
    const body  = req.body;
    if(!body||!body.email||!body.password||!body.name){
        return res.status(400).json(
            {success:false,
                message:"data is missing"
            }
        )
    }
await User.create({
    name:body.name,
    email:body.email,
    password:body.password
})
res.status(201).json({
    success:true,
    message:"user created successfully"
})

}