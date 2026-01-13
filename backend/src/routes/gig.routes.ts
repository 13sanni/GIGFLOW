import { Router } from "express";
import { createGig,getGigs, getGigById } from "../controllers/gig.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createGigSchema } from "../schemas/gig.schema.js";
import { validate } from "../middlewares/validation.middleware.js";

const gigRouter = Router();

gigRouter.post("/create",authMiddleware,validate(createGigSchema),createGig);
gigRouter.get("/gigs",authMiddleware,getGigs);
gigRouter.get("/gigs/:id",authMiddleware,getGigById);


export default gigRouter;