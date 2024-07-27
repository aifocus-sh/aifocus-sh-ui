"use client";

import FileSaver from "file-saver";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GenerateObjectType } from "@/types/text-to-chart";
import { useGenerateImage } from "recharts-to-png";
import { useCallback } from "react";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  data: GenerateObjectType;
}

export function AreaChartStacked({ data }: Props) {
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
  }, [getDivJpg]);

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
            <AreaChart
              accessibilityLayer
              data={data?.object?.chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={"label"}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                // tickFormatter={(value: string) => value?.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="valueOne"
                type="natural"
                fill={
                  data?.object?.chartConfig?.valueOne?.color ||
                  "hsl(173 58% 39%)"
                }
                fillOpacity={0.4}
                stroke={
                  data?.object?.chartConfig?.valueOne?.color ||
                  "hsl(173 58% 39%)"
                }
                stackId="a"
              />
              <Area
                dataKey="valueTwo"
                type="natural"
                fill={
                  data?.object?.chartConfig?.valueTwo?.color ||
                  "hsl(12 76% 61%)"
                }
                fillOpacity={0.4}
                stroke={
                  data?.object?.chartConfig?.valueTwo?.color ||
                  "hsl(12 76% 61%)"
                }
                stackId="a"
              />
            </AreaChart>
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
