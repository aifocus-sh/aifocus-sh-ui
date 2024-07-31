import { z } from "zod";

export const SeoMetaTagsSchema = z.object({
    examples: z.array(
      z.object({
        metaTitle: z.string(),
        metaDescription: z.string(),
      })
    ),
  })