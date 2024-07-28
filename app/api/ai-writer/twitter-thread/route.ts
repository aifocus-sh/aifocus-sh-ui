import { generateObject, streamObject } from "ai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";
import { TwitterThread } from "./schema";
const model = ollama("llama3");

const schema = z.object({
  topic: z.string(),
  tone: z.enum([
    "excited",
    "professional",
    "funny",
    "encouraging",
    "dramatic",
    "witty",
    "sarcastic",
    "engaging",
    "creative",
  ]),
  quantityTweets: z.number().min(2).max(10),
  quantity: z.number().min(1).max(5),
});

export async function POST(request: Request) {
  const { topic, tone, quantityTweets, quantity, temperature } =
    await request.json();


  const validateRequest = schema.safeParse({
    topic,
    tone,
    quantityTweets,
    quantity,
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
      schema: TwitterThread,
      prompt: `You are a marketing expert specialized in creating threads on Twitter. You will receive the following information:

      topic= ${topic}
      tone= ${tone}
      quantity= ${quantity}

      Your task is to use this information to generate tweets and threads on Twitter as follows:
        - Use the “topic” to create a main tweet.
        - Use the tone indicated in “tone” to give emotion and coherence to the tweet.
        - Generate ${quantityTweets} tweets thread for the main tweet following the idea and focus indicated in topic.
        - Repeat this process the number of times indicated in “quantity”.
        - uses emojis to persuade the user to read the twitter thread.
        - do not use hashtags
        - Use the 🧵 emoji in the end of the main tweet to invite the user to read the twitter thread.
        - Use the language used by the user, you will know this by analyzing the language of the topic.
        - If possible, use the topic indicated by the user to generate the tweets.

      Be sure to keep the tone ${tone} in every tweet and thread.
      `,
      temperature: temperature || 0.7,
    });
    return result.toTextStreamResponse()
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
}
