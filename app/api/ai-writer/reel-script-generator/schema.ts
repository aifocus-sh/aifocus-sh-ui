import { z } from "zod";

export const ReelScriptGeneratorSchema = z.object({
  title: z.string().describe("title of the reel"),
  tone: z.string().describe("tone of the reel"),
  time: z.string().describe("duration of the reel"),
  main_audio: z.string().describe("audio of the reel"),
  script: z.array(
    z.object({
      duration: z.number().describe("duration of the scene in seconds"),
      text: z.string().describe("text of the scene"),
      settings: z.object({
        type: z.enum(["image", "video", "text", "audio", "color background"]),
        url: z.object({}).nullable().default(null),
        category: z
          .enum([
            "backgrounds",
            "fashion",
            "nature",
            "science",
            "education",
            "feelings",
            "health",
            "people",
            "religion",
            "places",
            "animals",
            "industry",
            "computer",
            "food",
            "sports",
            "transportation",
            "travel",
            "buildings",
            "business",
            "music",
          ])
          .nullable(),
        tags_of_image: z.string().describe("description of the setting"),
      }),
    })
  ),
});
