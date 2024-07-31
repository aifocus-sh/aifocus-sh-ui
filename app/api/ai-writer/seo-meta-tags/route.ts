import { streamObject } from "ai";
import { z } from "zod";
import { SeoMetaTagsSchema } from "./schema";
import ollama from "@/lib/ollama";
const model = ollama(process.env.OLLAMA_MODEL || "llama3.1:70b")

const schema = z.object({
  keyword: z.string(),
  name: z.string().min(2),
  phrase: z.string().min(2),
  description: z.string().min(2),
  quantity: z.number().min(1).max(5),
});

export async function POST(request: Request) {
  const { keyword, name, phrase, description, quantity, temperature } =
    await request.json();

  const validateRequest = schema.safeParse({
    keyword,
    name,
    phrase,
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
      schema: SeoMetaTagsSchema,
      presencePenalty: 0.6,
      prompt: `You are an expert in generating meta tags to improve the SEO positioning of the product, service or page that the user provides. use “quantity” to generate the number of examples that the user requested to generate. The user provides the following information: \n\n Keyword:${keyword}, Name: ${name}, Phrase: ${phrase}, Description: ${description}, Quantity of examples to generate: ${quantity}.`,
      temperature: temperature || 0.7,
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
}
