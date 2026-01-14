import { z } from "zod";
export declare const createBidSchema: z.ZodObject<{
    gigId: z.ZodString;
    amount: z.ZodNumber;
    proposal: z.ZodString;
}, z.core.$strip>;
export default createBidSchema;
//# sourceMappingURL=bid.schema.d.ts.map