import { z } from "zod";

export const createBidSchema = z.object({
  gigId: z
    .string()
    .min(1, "gigId is required"),

  amount: z
    .number()
    .positive("amount must be greater than 0"),

  proposal: z
    .string()
    .min(1, "proposal is required")
});
export default createBidSchema;