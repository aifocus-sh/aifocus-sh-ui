import { z } from "zod";

export const PieWithTextChartDataEntrySchema = z.object({
  label: z.string().min(1),
  value: z.number().min(0),
  fill: z.string().min(1).describe("color of the slice in the chart (HEX)"), 
});

export const PieWithTextChartDataSchema = z.array(PieWithTextChartDataEntrySchema);

export const PieWithTextSchema = z.object({
  chartData: PieWithTextChartDataSchema,
  title: z.string().describe("title of the chart").min(1),
  description: z
    .string()
    .describe("description of the chart")
    .min(1),
});
