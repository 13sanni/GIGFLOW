import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import type {  Request, Response } from "express";



export const registerUser = async (req: Request, res: Response) => {
    try {
        const body = req.body;
       
        const hashedPassword = await bcrypt.hash(body.password, 10);
        await User.create({
            name: body.name,
            email: body.email,
            password: hashedPassword
        })
       return res.status(201).json({
            success: true,
            message: "user created successfully"
        })
    }


    catch (err) {
        const error = err as any;

        if (error.code === 11000) {
            return res.status(409).json({ message: "Email already exists" });
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const body = req.body;
       
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "user not found"
                }
            )
        }
        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json(
             {
                    success: false,
                    message: "invalid credentials"
                }
            )
        }
        const secretKey = process.env.JWT_SECRET_KEY as string;
        const token = jwt.sign({
                userId: user._id
            },
            secretKey,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {secure:false, httpOnly: true, sameSite: 'strict',});

        return res.status(200).json({
            success: true,
            message: "login successful"
        })
    }

    catch (err) {
        return res.status(500).json(
            {
                success: false,

                message: "internal server error"
            }
        )
    }}