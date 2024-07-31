import { z } from "zod";

export const InstagramCaptionSchema = z.object({
  examples: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
});
