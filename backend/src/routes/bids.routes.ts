import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import{
  createBid,
  getBidsForGig,
  getMyBids,
  hireBid
} from "../controllers/bids.Controller.js";
import { createBidSchema } from "../schemas/bid.schema.js";
import { validate } from "../middlewares/validation.middleware.js";

const bidRouter = Router();

bidRouter.post("/",authMiddleware,validate(createBidSchema),createBid)
bidRouter.get("/gig/:gigId",authMiddleware,getBidsForGig)
bidRouter.get("/my-bids",authMiddleware,getMyBids)
bidRouter.post("/:bidId/hire",authMiddleware,hireBid)

export default bidRouter
