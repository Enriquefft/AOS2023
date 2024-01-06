import { z } from "zod";

export const tagSchema = z
  .enum(["good", "bad", "both"])
  .optional()
  .nullable()
  .transform((tags) => tags ?? "both");

export type Tag = z.infer<typeof tagSchema>;
