import { z } from "zod";

export const chartDataItem = z.object({
  label: z.string().min(1),
  valueOne: z.number().min(0),
  valueTwo: z.number().min(0),
});

export const chartConfig = z.object({
  valueOne: z.object({
    label: z.string().describe("yAxis label").min(1, "Invalid label"),
    color: z.string().default("hsl(173 58% 39%)"),
  }),
  valueTwo: z.object({
    label: z.string().describe("yAxis label").min(1, "Invalid label"),
    color: z.string().default("hsl(12 76% 61%)"),
  }),
});

export const AreaChartStackedSchema = z.object({
  chartData: z.array(chartDataItem),
  chartConfig: chartConfig,
  title: z.string().describe("title of the chart").min(1, "Invalid title"),
  description: z.string().describe("description of the chart").min(1, "Invalid description"),
});
