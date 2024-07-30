import { generateObject } from "ai";
import { LibraryCharts, LibraryChartsKeys } from "@/components/chart-view/library-charts";
import ollama from "@/lib/ollama";

const model = ollama(process.env.OLLAMA_MODEL || "llama3.1:70b");
export async function POST(request: Request) {
  const { prompt, library }:{prompt: string, library: LibraryChartsKeys} = await request.json();

  if(!library){
    return Response.json({error: "Library not found"}, { status: 404 });
  }

  try {
    const result = await generateObject({
      model,
      mode: "json",
      schema: LibraryCharts[library].schema as any,
      prompt: (LibraryCharts[library].prompt as string).replace('{{text}}', prompt),
      temperature: 0.7,
      
    });
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }

}
