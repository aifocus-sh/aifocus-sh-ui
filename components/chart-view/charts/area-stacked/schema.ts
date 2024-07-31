import { z } from "zod";

export const chartDataItem = z.object({
  label: z.string(),
}).catchall(z.number())

export const chartConfig = z.intersection(
  z.record(
    z.string(),
    z.object({
      label: z.string(),
      color: z.string().describe("beautiful color in rgb format"),
    })
  ),
  z.record(
    z.string(),
    z.object({
      label: z.string(),
      color: z.string().describe("beautiful color in rgb format"),
    })
  )
);

export const AreaChartStackedSchema = z.object({
  chartData: z.array(chartDataItem),
  chartConfig: chartConfig,
  title: z.string().describe("title of the chart").min(1, "Invalid title"),
  description: z
    .string()
    .describe("short description of the chart")
});
