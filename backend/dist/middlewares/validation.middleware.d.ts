import { ZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";
export declare const validate: (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validation.middleware.d.ts.map