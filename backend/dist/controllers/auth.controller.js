import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword
        });
    }
    catch (err) {
        if (err.code === 11000) {
            throw new AppError("Email already exists", 409);
        }
        throw err;
    }
    return res.status(201).json({
        success: true,
        message: "user created successfully"
    });
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("user not found", 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError("invalid credentials", 401);
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1d" });
    res.cookie("token", token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "none"
    });
    return res.status(200).json({
        success: true,
        message: "login successful"
    });
};
// Logout user 
export const logoutUser = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production"
    });
    return res.status(200).json({
        success: true,
        message: "logout successful"
    });
};
export const getMe = (req, res) => {
    return res.status(200).json({
        success: true,
        user: {
            userId: req.user.userId
        }
    });
};
//# sourceMappingURL=auth.controller.js.map