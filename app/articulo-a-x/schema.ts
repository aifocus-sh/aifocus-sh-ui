import { z } from "zod";

export const TweetsSchema = z.object({
  tweets: z.array(
    z.object({
      text: z.string().describe("text of the tweet"),
      username: z.string().describe("use always @aihub_sh"),
      url: z
        .string()
        .describe(
          "example of a url that could help understand the idea of the tweet"
        ),
      image: z
        .string()
        .describe(
          "description of the image that could help understand the idea of the tweet"
        ),
    })
  ),
});
