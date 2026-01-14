import { Router } from "express";

import { registerUser,loginUser, getMe} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authSchema } from "../schemas/auth.schema.js";
import { validate } from "../middlewares/validation.middleware.js";
import { logoutUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register",validate(authSchema.registerSchema),registerUser)
router.post("/login",validate(authSchema.loginSchema),loginUser);
router.post("/logout",authMiddleware,logoutUser);

router.get("/me", authMiddleware, getMe);



export default router