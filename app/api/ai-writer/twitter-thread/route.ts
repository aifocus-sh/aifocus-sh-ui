import { streamObject } from "ai";
import { z } from "zod";
import { TwitterThread } from "./schema";
import ollama from "@/lib/ollama";
import prisma from "@/lib/prisma";

const model = "llama3.1"

export const maxDuration = 60;

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


const insert = async (data: any) => {
  await prisma.usage.create({ data });
}

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
      model: ollama(model),
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

      your response should be in json format. For example:

      {
        "examples": [
          {
            "main_tweet": string,
            "thread": [
              {
                "tweet": string
              }
            ]
          }
        ]
      }

      `,
      temperature: temperature || 0.7,
      onFinish: ({ object }) => {
        insert({
          data: {
            content: object as any,
            parameters: { topic, tone, quantityTweets, quantity, temperature },
            endpoint: "/api/ai-writer/twitter-thread",
            model: model,
          },
        });
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.log(error);
    console.log("process.env.OLLAMA_MODEL: ", process.env.OLLAMA_MODEL);
    return Response.json(error, { status: 500 });
  }
}
