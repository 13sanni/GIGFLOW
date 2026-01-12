import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { type Request, type Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        if (!body || !body.email || !body.password || !body.name) {
            return res.status(400).json(
                {
                    success: false,
                    message: "data is missing"
                }
            )
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        await User.create({
            name: body.name,
            email: body.email,
            password: hashedPassword
        })
        res.status(201).json({
            success: true,
            message: "user created successfully"
        })
    }


    catch (err) {
        const error = err as any;

        if (error.code === 11000) {
            res.status(409).json({ message: "Email already exists" });
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        if (!body || !body.email || !body.password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "data is missing"
                }
            )
        }
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
        res.status(200).json({
            success: true,
            message: "login successful"
        })
    }

    catch (err) {
        res.status(500).json(
            {
                success: false,

                message: "internal server error"
            }
        )
    }}