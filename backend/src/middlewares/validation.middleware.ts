import  { ZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.errors?.[0]?.message || "Invalid request data"
      });
    }
  };
