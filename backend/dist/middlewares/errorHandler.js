import { ZodError } from "zod";
import { AppError } from "../utils/appError.js";
export const errorHandler = (err, req, res, next) => {
    // Zod validation errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: err.issues?.[0]?.message || "Invalid request data"
        });
    }
    // Custom application errors
    if (err instanceof AppError) {
        return res.status(err.status).json({
            success: false,
            message: err.message
        });
    }
    // Unknown errors
    return res.status(500).json({
        success: false,
        message: "internal server error"
    });
};
//# sourceMappingURL=errorHandler.js.map