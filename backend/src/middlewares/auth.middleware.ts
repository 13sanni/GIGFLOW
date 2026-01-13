import type {  NextFunction, Request, Response} from "express";

import jwt from "jsonwebtoken";
const authMiddleware = (req :Request, res:Response,next:NextFunction) => {
let token = req.cookies['token'];
if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });}

const secretKey = process.env.JWT_SECRET_KEY as string;
     jwt.verify(token, secretKey, (err:any , decoded:any) => {
          
    if (err) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    } else {
        (req as any).user = decoded;
         next();
    } })
   
}     
export default authMiddleware;