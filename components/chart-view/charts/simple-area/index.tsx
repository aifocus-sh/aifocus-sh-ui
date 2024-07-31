"use client";

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
import { Button } from "@/components/ui/button";
import { DownloadCloud } from "lucide-react";
import { useGenerateImage } from "recharts-to-png";
import React from "react";
import FileSaver from "file-saver";

interface Props {
  data: any;
}

export function SimpleAreaChartView({ data }: Props) {
  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  };

  const [getDivJpg, { ref: divRef }] = useGenerateImage<HTMLDivElement>({
    quality: 0.8,
    type: "image/jpg",
  });

  const handleDivDownload = React.useCallback(async () => {
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
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data.object.chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="value"
                type="natural"
                fill="var(--color-value)"
                fillOpacity={0.4}
                stroke="var(--color-value)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Button
        onClick={handleDivDownload}
        className="w-full mt-4 bg-teal-500 hover:bg-teal-600"
      >
        Download Chart image
        <DownloadCloud className="w-6 h-6 ml-2" />
      </Button>
    </>
  );
}
