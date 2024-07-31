import ollama from "@/lib/ollama";
import { generateObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const {
    keyword,
    language,
    quantity,
    title,
    paragraph: description,
    last_headings,
  } = await req.json();

  if (!keyword || !language || !quantity || !title || !description) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const result = await generateObject({
      model: ollama("llama3.1"),
      mode: "json",
      schema: z.object({
        result: z.array(
          z.object({
            examples: z.array(z.string()),
          })
        ),
      }),
      presencePenalty: 0.9,
      prompt: `
      You are an SEO expert who specializes in search engine optimization.

      PARAMETERS:
        - Keyword: ${keyword}
        - Language: ${language}
        - Quantity of examples: ${quantity}
        - Title: ${title}
        - Into Paragraph: ${description}
        - Headings for examples grouped in the array: 5

      TASK:
        - Your main task will be to generate 5 (five) attractive headings for each examples grouped in the array, these headings will be used as subtitles in an article taking into account the parameters mentioned above. 

      INSTRUCTIONS:
        - Titles should not be similar to the last headings: ${last_headings}
        - examples must have 10 article headings
        - Each title in example must follow the main idea of the article which would be defined in the Keyword, the Title and the Into Paragraph.
      
      
      your response should be an array of titles: 
      {
        "result": [
          {
            "examples": [
              "example 1",
              "example 2"
              "example 3"
              "example 4"
              "example 5"
            ]
          },
          ...
        ]
      }
      `,
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
