import { z } from "zod";
export const createGigSchema = z.object({
    title: z
        .string()
        .min(1, "title is required"),
    description: z
        .string()
        .min(1, "description is required"),
    budget: z
        .number()
        .positive("budget must be greater than 0")
});
export default createGigSchema;
//# sourceMappingURL=gig.schema.js.map