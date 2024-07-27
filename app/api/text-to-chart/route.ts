import { generateObject } from "ai";
import { ollama } from "ollama-ai-provider";
import { LibraryCharts, LibraryChartsKeys } from "@/components/chart-view/library-charts";

const model = ollama("llama3");
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
      prompt: `Analyzes the text for sufficient information to create a chart: ${prompt}`,
      temperature: 0.7,
      
    });
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }

}
