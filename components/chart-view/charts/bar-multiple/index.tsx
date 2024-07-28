"use client";

import { DownloadCloud, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GenerateObjectType } from "@/types/text-to-chart";
import { useGenerateImage } from "recharts-to-png";
import { useCallback } from "react";
import FileSaver from "file-saver";
import { Button } from "@/components/ui/button";

interface Props {
  data: GenerateObjectType;
}

export function BarMultipleView({ data }: Props) {
  const [getDivJpg, { ref: divRef }] = useGenerateImage<HTMLDivElement>({
    quality: 0.8,
    type: "image/jpg",
  });

  const handleDivDownload = useCallback(async () => {
    const jpeg = await getDivJpg();
    if (jpeg) {
      FileSaver.saveAs(
        jpeg,
        data?.object?.title ? `${data?.object?.title}.jpg` : "chart.jpg"
      );
    }
  }, [getDivJpg, data?.object?.title]);
  return (
    <>
      <Card ref={divRef}>
        <CardHeader>
          {data?.object?.title && <CardTitle>{data?.object?.title}</CardTitle>}
          {data?.object?.description && (
            <CardDescription>{data?.object?.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ChartContainer config={data?.object?.chartConfig}>
            <BarChart accessibilityLayer data={data?.object?.chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="valueOne"
                fill={
                  data?.object?.chartConfig?.valueOne?.color ||
                  "hsl(173 58% 39%)"
                }
                radius={4}
              />
              <Bar
                dataKey="valueTwo"
                fill={
                  data?.object?.chartConfig?.valueTwo?.color ||
                  "hsl(12 76% 61%)"
                }
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Button onClick={handleDivDownload} className="w-full mt-4 bg-teal-500 hover:bg-teal-600">
        Download Chart image
        <DownloadCloud className="w-6 h-6 ml-2" />
      </Button>
    </>
  );
}
