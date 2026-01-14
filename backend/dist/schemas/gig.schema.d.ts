import { z } from "zod";
export declare const createGigSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    budget: z.ZodNumber;
}, z.core.$strip>;
export default createGigSchema;
//# sourceMappingURL=gig.schema.d.ts.map