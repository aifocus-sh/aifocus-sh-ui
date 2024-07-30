import ollama from "@/lib/ollama";
import { generateObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { keyword, language, quantity, last_paragraph, title } = await req.json();

  if (!keyword || !language || !quantity || !title) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const result = await generateObject({
      model: ollama(process.env.OLLAMA_MODEL || "llama3.1:70b"),
      mode: "json",
      schema: z.object({ examples: z.array(z.string()) }),
      presencePenalty: 0.9,
      prompt: `
      You are an SEO expert who specializes in search engine optimization.
      
      Parameters:
        - Keyword: ${keyword}
        - Language: ${language}
        - Quantity: ${quantity}
        - Title: ${title}

      Your task: Generate into paragraph that go according to this title and this keyword that we want to position in google using the best practices, always using strictly the language. 

      Instructions:
        - Into paragraph should be max 2000 characters. Extend the paragraph as much as possible, as long as it is less than 2000 characters.
        - Each intro paragraph you generate STRICTLY must have a minimum of 1024 characters.
        - Into paragraph should not be similar to the last paragraph: ${last_paragraph}
      
      
      your response should be an array of titles:
      {
        "examples": [
          "intro paragraph 1"
        ]
      }
      `,
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
