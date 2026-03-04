import { ZodObject } from "zod";
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        next(err); // ✅ Pass to global errorHandler which handles ZodErrors
    }
};
//# sourceMappingURL=validation.middleware.js.map