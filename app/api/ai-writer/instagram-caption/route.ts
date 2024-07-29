import { generateObject, streamObject } from "ai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";
import { InstagramCaptionSchema } from "./schema";
const model = ollama("llama3");

const schema = z.object({
  title: z.string(),
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
  description: z.string().min(2),
  quantity: z.number().min(1).max(5),
});

export async function POST(request: Request) {
  const { title, tone, description, quantity, temperature } =
    await request.json();

  const validateRequest = schema.safeParse({
    title,
    tone,
    description,
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
      schema: InstagramCaptionSchema,
      prompt: `You are a marketing expert specialized in creating eye-catching posts for Instagram. You will receive the following information and you must improve the title and description using relevant emojis and hashtags. Make sure to keep the tone indicated by the user.
      
      title: ${title}
      tone: ${tone}
      description: ${description}
      quantity: ${quantity}

      Task:
        - Improve the title using emojis and keeping the tone ${tone}.
        - Improve the description using emojis, hashtags and keeping the ${tone} tone.
        - Make sure the result is eye-catching and appealing for an Instagram post.
      
      Instructions:
        - Always use the tone indicated by the user.
        - Use emojis and hashtags to make the content more engaging.
        - Keep the message clear and persuasive.
        - use “quantity” to generate the number of examples that the user requested to generate.
        - use strictly the language of the title and description text.

      `,
      temperature: temperature || 0.7,
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
}
