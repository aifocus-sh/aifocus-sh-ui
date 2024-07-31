import { AreaChartStacked } from "./charts/area-stacked";
import { AreaChartStackedSchema } from "./charts/area-stacked/schema";
import { BarMultipleView } from "./charts/bar-multiple";
import { BarMultipleSchema } from "./charts/bar-multiple/schema";
import { PieWithTextView } from "./charts/pie-with-text";
import { PieWithTextSchema } from "./charts/pie-with-text/schema";
import { SimpleAreaChartView } from "./charts/simple-area";
import { SimpleAreaChartSchema } from "./charts/simple-area/schema";

export type LibraryChartsKeys = keyof typeof LibraryCharts;
export type LibraryChartsValue = {
  label: string;
  warning?: string;
  value: string;
  image: string;
  Component: any;
  schema: any;
}

export const LibraryCharts = {
  AreaChartStacked: {
    label: "Area Chart - Stacked",
    warning: "Require at least 2 data points",
    value: "AreaChartStacked",
    image: "/images/charts/area-stacked.png",
    Component: ({data}: any) => <AreaChartStacked data={data} />,
    schema: AreaChartStackedSchema,
    code: '"use client"\n\nimport { TrendingUp } from "lucide-react"\nimport { Area, AreaChart, CartesianGrid, XAxis } from "recharts"\n\nimport {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from "@/components/ui/card"\nimport {\n  ChartConfig,\n  ChartContainer,\n  ChartTooltip,\n  ChartTooltipContent,\n} from "@/components/ui/chart"\n\nconst chartData = {{chartData}}\n\nconst chartConfig = {{chartConfig}} satisfies ChartConfig\n\nexport function Component() {\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>{{title}}</CardTitle>\n        <CardDescription>{{description}}</CardDescription>\n      </CardHeader>\n      <CardContent>\n        <ChartContainer config={chartConfig}>\n          <AreaChart\n            accessibilityLayer\n            data={chartData}\n            margin={{\n              left: 12,\n              right: 12,\n            }}\n          >\n            <CartesianGrid vertical={false} />\n            <XAxis\n              dataKey="label"\n              tickLine={false}\n              axisLine={false}\n              tickMargin={8}\n              tickFormatter={(value) => value.slice(0, 3)}\n            />\n            <ChartTooltip\n              cursor={false}\n              content={<ChartTooltipContent indicator="dot" />}\n            />\n            <Area\n              dataKey="valueOne"\n              type="natural"\n              fill="var(--color-mobile)"\n              fillOpacity={0.4}\n              stroke="var(--color-mobile)"\n              stackId="a"\n            />\n            <Area\n              dataKey="valueTwo"\n              type="natural"\n              fill="var(--color-desktop)"\n              fillOpacity={0.4}\n              stroke="var(--color-desktop)"\n              stackId="a"\n            />\n          </AreaChart>\n        </ChartContainer>\n      </CardContent>\n    </Card>\n  )\n}',
    prompt: `Search the following text for relevant information that can be used to present historical data: 
    
    text or csv data:
    {{text}} 
    
    Your response should be in a json like this:

    {
      "title": string,
      "description": string,
      "chartData": [
        {
          "label": string,
          [valueOne|valueTwo|...]: number,
          [valueOne|valueTwo|...]: number
        },
        {
          "label": string,
          [valueOne|valueTwo|...]: number,
          [valueOne|valueTwo|...]: number
        },
        ...
      ],
      "chartConfig": {
        [valueOne|valueTwo|...]: {
          "label": string,
          "color": string
        },
        [valueOne|valueTwo|...]: {
          "label": string,
          "color": string
        },
        ...
      }
    }
    
    `,
  },

  BarChartMultiple: {
    label: "Bar Chart - Multiple",
    warning: "Require at least 2 data points",
    value: "BarChartMultiple",
    image: "/images/charts/bar-multiple.png",
    Component: ({data}: any) => <BarMultipleView data={data} />,
    schema: BarMultipleSchema,
    code: '""use client"\n\nimport { Bar, BarChart, CartesianGrid, XAxis } from "recharts"\n\nimport {\n  Card,\n  CardContent,\n  CardDescription,\n  CardHeader,\n  CardTitle,\n} from "@/components/ui/card"\nimport {\n  ChartConfig,\n  ChartContainer,\n  ChartTooltip,\n  ChartTooltipContent,\n} from "@/components/ui/chart"\nconst chartData = {{chartData}}\n\nconst chartConfig = {{chartConfig}} satisfies ChartConfig\n\nexport function Component() {\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>{{title}}</CardTitle>\n        <CardDescription>{{description}}</CardDescription>\n      </CardHeader>\n      <CardContent>\n        <ChartContainer config={chartConfig}>\n          <BarChart accessibilityLayer data={chartData}>\n            <CartesianGrid vertical={false} />\n            <XAxis\n              dataKey="label"\n              tickLine={false}\n              tickMargin={10}\n              axisLine={false}\n              tickFormatter={(value) => value.slice(0, 3)}\n            />\n            <ChartTooltip\n              cursor={false}\n              content={<ChartTooltipContent indicator="dashed" />}\n            />\n            <Bar dataKey="valueOne" fill="var(--color-desktop)" radius={4} />\n            <Bar dataKey="valueTwo" fill="var(--color-mobile)" radius={4} />\n          </BarChart>\n        </ChartContainer>\n      </CardContent>\n    </Card>\n  )\n}\n"',
    prompt: `Search the following text for relevant information that can be used to present historical data:
    
    text or csv data:
    {{text}} 
    `
  },

  PieDonutWithText: {
    label: "Pie Chart - Donut with Text",
    value: "PieDonutWithText",
    image: "/images/charts/pie-with-text.png",
    Component: ({data}: any) => <PieWithTextView data={data} />,
    schema: PieWithTextSchema,
    code: '"use client"\n\nimport * as React from "react"\nimport { TrendingUp } from "lucide-react"\nimport { Label, Pie, PieChart } from "recharts"\n\nimport {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from "@/components/ui/card"\nimport {\n  ChartConfig,\n  ChartContainer,\n  ChartTooltip,\n  ChartTooltipContent,\n} from "@/components/ui/chart"\nconst chartData = {{chartData}}\n\nconst chartConfig = {{chartConfig}} satisfies ChartConfig\n\nexport function Component() {\n  const total = React.useMemo(() => {\n    return chartData.reduce((acc, curr) => acc + curr.value, 0)\n  }, [])\n\n  let chartConfig = {};\n  \n  chartData.forEach((item) => {\n    chartConfig = {\n      ...chartConfig,\n      [item.label]: {\n        label: item.label,\n        color: item.fill,\n      },\n    };\n  });\n\n  return (\n    <Card className="flex flex-col">\n      <CardHeader className="items-center pb-0">\n        <CardTitle>{{title}}</CardTitle>\n        <CardDescription>{{description}}</CardDescription>\n      </CardHeader>\n      <CardContent className="flex-1 pb-0">\n        <ChartContainer\n          config={chartConfig}\n          className="mx-auto aspect-square max-h-[250px]"\n        >\n          <PieChart>\n            <ChartTooltip\n              cursor={false}\n              content={<ChartTooltipContent hideLabel />}\n            />\n            <Pie\n              data={chartData}\n              dataKey="value"\n              nameKey="label"\n              innerRadius={60}\n              strokeWidth={5}\n            >\n              <Label\n                content={({ viewBox }) => {\n                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {\n                    return (\n                      <text\n                        x={viewBox.cx}\n                        y={viewBox.cy}\n                        textAnchor="middle"\n                        dominantBaseline="middle"\n                      >\n                        <tspan\n                          x={viewBox.cx}\n                          y={viewBox.cy}\n                          className="fill-foreground text-3xl font-bold"\n                        >\n                          {total.toLocaleString()}\n                        </tspan>\n                        <tspan\n                          x={viewBox.cx}\n                          y={(viewBox.cy || 0) + 24}\n                          className="fill-muted-foreground"\n                        >\n                          Total\n                        </tspan>\n                      </text>\n                    )\n                  }\n                }}\n              />\n            </Pie>\n          </PieChart>\n        </ChartContainer>\n      </CardContent>\n    </Card>\n  )\n}\n',
    prompt: `Search the following text for relevant information that can be used to present historical data: 
    
    text or csv data:
    {{text}} 
    `
  },

  SimpleAreaChart:{
    label: "Simple Area Chart",
    value: "SimpleAreaChart",
    image: "/images/charts/simple-area-chart.png",
    Component: ({data}: any) => <SimpleAreaChartView data={data} />,
    schema: SimpleAreaChartSchema,
    code: "\"use client\"\n\nimport { TrendingUp } from \"lucide-react\"\nimport { Area, AreaChart, CartesianGrid, XAxis } from \"recharts\"\n\nimport {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from \"@/components/ui/card\"\nimport {\n  ChartConfig,\n  ChartContainer,\n  ChartTooltip,\n  ChartTooltipContent,\n} from \"@/components/ui/chart\"\nconst chartData = {{chartData}}\n\nconst chartConfig = {\n  value: {\n    label: \"Value\",\n    color: \"hsl(var(--chart-1))\",\n  },\n} satisfies ChartConfig\n\nexport function Component() {\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>{{title}}</CardTitle>\n        <CardDescription>\n          {{description}}\n        </CardDescription>\n      </CardHeader>\n      <CardContent>\n        <ChartContainer config={chartConfig}>\n          <AreaChart\n            accessibilityLayer\n            data={chartData}\n            margin={{\n              left: 12,\n              right: 12,\n            }}\n          >\n            <CartesianGrid vertical={false} />\n            <XAxis\n              dataKey=\"label\"\n              tickLine={false}\n              axisLine={false}\n              tickMargin={8}\n              tickFormatter={(value) => value.slice(0, 3)}\n            />\n            <ChartTooltip\n              cursor={false}\n              content={<ChartTooltipContent indicator=\"line\" />}\n            />\n            <Area\n              dataKey=\"value\"\n              type=\"natural\"\n              fill=\"var(--color-value)\"\n              fillOpacity={0.4}\n              stroke=\"var(--color-value)\"\n            />\n          </AreaChart>\n        </ChartContainer>\n      </CardContent>\n    </Card>\n  )\n}\n",
    prompt: `Search the following text for relevant information that can be used to present historical data: 
    
    text or csv data:
    {{text}} 
    `
  }
};
