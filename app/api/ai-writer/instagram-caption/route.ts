import { streamObject } from "ai";
import { z } from "zod";
import { InstagramCaptionSchema } from "./schema";
import ollama from "@/lib/ollama";
import { validateRateLimit } from "@/utils/Ratelimit";
const model = ollama("llama3.1");

export const maxDuration = 60;

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

	//validate limit rate with  upstash
	const rateLimit = await validateRateLimit();
	if (!rateLimit.isPermitted) {
		return Response.json({ error: `${rateLimit.message}` }, { status: 429 });
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

      Response schema: 
      {
        "examples": [
          {
            "title": string,
            "description": string
          }
        ]
      }

      `,
			temperature: temperature || 0.7,
		});
		return result.toTextStreamResponse();
	} catch (error) {
		return Response.json(error, { status: 500 });
	}
}
