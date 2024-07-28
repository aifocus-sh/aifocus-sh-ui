"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
import { Button } from "@/components/ui/button";
import { DownloadCloud } from "lucide-react";
import { useGenerateImage } from "recharts-to-png";
import FileSaver from "file-saver";

interface Props {
  data: GenerateObjectType;
}

export function PieWithTextView({ data }: Props) {
  const total = React.useMemo(() => {
    return data.object.chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [data.object.chartData]);

  let chartConfig = {};

  data.object.chartData.forEach((item) => {
    chartConfig = {
      ...chartConfig,
      [item.label]: {
        label: item.label,
        color: item.fill,
      },
    };
  });

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
      <Card className="flex flex-col" ref={divRef}>
        <CardHeader className="items-center pb-0">
          {data?.object?.title && <CardTitle>{data?.object?.title}</CardTitle>}
          {data?.object?.description && (
            <CardDescription>{data?.object?.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data.object.chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
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
