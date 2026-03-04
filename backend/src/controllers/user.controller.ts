import type { Request, Response } from "express";

import { getBiddedGigsActivity } from "../services/activity.service.js";

export const getBiddedGigs = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  const gigs = await getBiddedGigsActivity(userId);

  return res.status(200).json({
    success: true,
    gigs,
  });
};
