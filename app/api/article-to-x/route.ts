import { TweetsSchema } from "@/app/articulo-a-x/schema";
import { streamObject } from "ai";
import { ollama } from "ollama-ai-provider";

const model = ollama("llama3.1");

export const POST = async (req: Request) => {
  const prompt = await req.text();

  const result = await streamObject({
    mode: "json",
    model,
    schema: TweetsSchema,
    system:
      "Your purpose is to create Twitter/X threads. Create an informative thread with a minimum of 7 to a maximum of 14 tweets." +
      'The first tweet must begin with the central idea and the main argument of the text, and only the first tweet must end with: "thread incoming 🧵" or in spanish if the text is in language spanish "Va 🧵".' +
      "The final tweet should invite sharing the thread and end with [link to the article]." +
      "In the schema describe the image that could help understand the idea of the tweet.",
    prompt,
  });

  return result.toTextStreamResponse();
};
