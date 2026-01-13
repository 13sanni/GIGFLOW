import { Router } from "express";
import { createGig,getGigs } from "../controllers/gig.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const gigRouter = Router();

gigRouter.post("/create",authMiddleware,createGig);
gigRouter.get("/gigs",authMiddleware,getGigs);


export default gigRouter;