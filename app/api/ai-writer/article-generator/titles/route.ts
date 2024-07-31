import ollama from "@/lib/ollama";
import { generateObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { keyword, language, quantity, last_titles } = await req.json();

  if (!keyword || !language || !quantity) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const result = await generateObject({
      model: ollama("llama3.1"),
      mode: "json",
      schema: z.object({ titles: z.array(z.string()) }),
      presencePenalty: 1,
      prompt: `
      You are an SEO expert who specializes in search engine optimization.
      
      Your task: Generate ${quantity} title with the following topic: ${keyword} using strictly the ${language} language

      Instructions:
        - Title length should be 13-15 words 
        - Titles should be 80-90 characters.
        - Titles should not be similar to the last titles: ${last_titles}
      
      
      your response should be an array of titles: 
      {
        "titles": [
          "title 1"
        ]
      }
      `,
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
