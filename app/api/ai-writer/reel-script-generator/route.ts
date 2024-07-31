import { streamObject } from "ai";
import { z } from "zod";
import { ReelScriptGeneratorSchema } from "./schema";
import ollama from "@/lib/ollama";

const model = ollama(process.env.OLLAMA_MODEL || "llama3.1");

const schemaJsonValidator = z.object({
  title: z.string(),
  description: z.string().min(2),
  time: z.enum(["short", "medium", "long"]),
  tone: z.enum([
    "casual",
    "dry",
    "edgy",
    "formal",
    "authoritative",
    "caring",
    "cheerful",
    "coarse",
    "conservative",
    "conversational",
    "convincing",
    "creative",
    "enthusiastic",
    "expository",
    "frank",
    "friendly",
    "fun",
    "funny",
    "humble",
    "humorous",
    "informative",
    "inspirational",
    "irreverent",
    "journalistic",
    "joyful",
    "matteroffact",
    "nostalgic",
    "objective",
    "passionate",
    "poetic",
    "playful",
    "professional",
    "provocative",
    "quirky",
    "respectful",
    "romantic",
    "sarcastic",
    "serious",
    "smart",
    "snarky",
    "subjective",
    "sympathetic",
    "thoughtful",
    "trendy",
    "trustworthy",
    "unapologetic",
    "upbeat",
    "witty",
    "worried",
  ]),
});

const getTimeInSeconds = (time: string) => {
  switch (time) {
    case "short":
      return 15;
    case "medium":
      return 30;
    case "long":
      return 60;
  }
};

export async function POST(request: Request) {
  const { title, description, time, tone, temperature } = await request.json();

  const validateRequest = schemaJsonValidator.safeParse({
    title,
    description,
    time,
    tone,
  });

  if (!validateRequest.success) {
    return Response.json(
      { error: true, message: validateRequest.error?.issues },
      { status: 400 }
    );
  }

  try {
    const result = await streamObject({
      model,
      mode: "json",
      schema: ReelScriptGeneratorSchema,
      presencePenalty: 0.6,
      prompt: `
      You are a marketing expert focused on creating reels for YouTube, Instagram, Facebook and TikTok. Your expertise is focused on reaching your users in the best way and increasing the number of visitors and views on your articles and reels.
  
      These are the initial parameters you will work with:
  
      title: ${title}
      tone: ${tone}
      time: ${getTimeInSeconds(time)} seconds
      description: ${description}

      **Goal:**

      Create a script for an Instagram reel without a narrator, using only on-screen text and background audio. Each scene must include specific details about the text to be displayed, the description of the image or video to be used, and the duration of each scene.

      **Rules and Tasks:**

      1. **Total Duration:** 
        - The script must comply with the total duration indicated by the user. 
        - The schema is an example of how you should return the json in your response. 
        - Generate only one example. 
        - For text generation, use the language used by the user in the description and title.
      2. **Scenes:**
        - Each scene must have a specific duration.
        - There must be a clear transition between scenes.
      3. **On-Screen Text:**
        - Include the exact text that will appear in each scene.
        - The text must be brief, clear, and easy to read.
      4. **Image or Video Description:**
        - Describe in detail the image or video that will be shown in each scene.
      5. **Background Audio:**
        - Indicate important changes in the background audio if applicable (e.g., change of pace, sound effects).
      6. **Script Format:**
        - The script must be structured in JSON format.
        - Each scene must be represented as a JSON object with the following keys:
        - 'duration': Duration of the scene in seconds integer.
        - 'text': Text that will appear on the screen.
        - 'settings': 
          - 'type': Type of setting (image, video, text, audio, color background) The script should always start with at least a video or background image.
          - 'category': use the categories list provided, never create a new one, just choose one per scene:  "image" | "video" | "audio";
          "category": "backgrounds" | "fashion" | "nature" | "science" | "education" | "feelings" | "health" | "people" | "religion" | "places" | "animals" | "industry" | "computer" | "food" | "sports" | "transportation" | "travel" | "buildings" | "business" | "music"
          - 'tags_of_image': Place search tags to help you find the image you suggest.
      

      **Response format:**

      {
        "title": string;
        "tone": string;
        "time": string;
        "main_audio": string;
        "script": [
          {
            "duration": number;
            "text": string;
            "settings": {
              "type":  "image" | "video" | "audio";
              "category": "backgrounds" | "fashion" | "nature" | "science" | "education" | "feelings" | "health" | "people" | "religion" | "places" | "animals" | "industry" | "computer" | "food" | "sports" | "transportation" | "travel" | "buildings" | "business" | "music";
              "tags_of_image": string;
            },
          }
        ]
      }
      `,
      temperature: temperature || 0.7,
    });

    // const buildScripts = await Promise.all(
    //   result.object.script.map(async (scene) => {
    //     if (
    //       scene.settings.type === "image" ||
    //       scene.settings.type === "video"
    //     ) {
    //       const url = await getMedia(
    //         scene.settings.type,
    //         scene.settings.tags_of_image,
    //         scene.settings.category || "all"
    //       );
    //       return {
    //         ...scene,
    //         settings: {
    //           ...scene.settings,
    //           url,
    //         },
    //       };
    //     } else {
    //       return scene;
    //     }
    //   })
    // );

    return result.toTextStreamResponse();
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

async function getMedia(type: string, q: string, category: string) {
  if (!process.env.PIXABAY_TOKEN) {
    throw new Error("PUBLIC_NEXT_PIXABAY_TOKEN is not defined");
  }

  const params = new URLSearchParams();
  params.append("key", process.env.PIXABAY_TOKEN);
  params.append("orientation", "horizontal");
  params.append("category", category);
  params.append("pretty", "true");
  params.append("order", "popular");
  params.append("safesearch", "true");
  params.append("per_page", "3");

  const query = q?.toLowerCase()?.replaceAll(" ", "+").replaceAll("pixabay", "").replaceAll("'", "").replace(/\s/g, "+").replace(/\?/g, "");

  const url = `https://pixabay.com/api/${
    type === "video" ? "videos/" : ""
  }?${params.toString()}&q=${query}`;
  console.log(url);
  const options = { method: "GET" };

  const response = await fetch(url, options);
  const data = await response.json();

  return data?.hits?.[0];
}
