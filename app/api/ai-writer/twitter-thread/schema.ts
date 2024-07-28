import { z } from "zod";

export const TwitterThreadExampleItem = z.object({
  main_tweet: z.string(),
  thread: z.array(
    z.object({
      tweet: z.string(),
    })
  ),
});

export const TwitterThread = z.object({
  examples: z.array(TwitterThreadExampleItem),
});
