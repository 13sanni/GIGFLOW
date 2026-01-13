import { Router } from "express";
import type { Request, Response } from "express";
import { registerUser,loginUser} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/register",registerUser)
router.post("/login",loginUser);
router.get("/test",authMiddleware,(req:Request,res:Response)=>{
    res.status(200).json({message:"Auth route working fine",user:(req as any).user})
    });




export default router