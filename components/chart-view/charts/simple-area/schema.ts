import { z } from 'zod';

// Define el esquema para cada entrada en chartData
export const SimpleAreaChartDataEntrySchema = z.object({
  label: z.string(),
  value: z.number(),
});

// Define el esquema para chartData
export const SimpleAreaChartDataSchema = z.array(SimpleAreaChartDataEntrySchema);

// Define el esquema completo para el JSON
export const SimpleAreaChartSchema = z.object({
  chartData: SimpleAreaChartDataSchema,
  title: z.string().describe("title of the chart").min(1),
  description: z
    .string()
    .describe("description of the chart")
    .min(1),
});
