import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { GenerateObjectType } from "@/types/text-to-chart";
import Code from "./code/code";
import { LibraryCharts, LibraryChartsKeys } from "./library-charts";

interface Props {
  isLoading: boolean;
  result: GenerateObjectType | null;
  error: boolean;
}
export function ResultView({ isLoading, result, error }: Props) {
  const [activeTab, setActiveTab] = useState("chart");

  const { Component, code: lcode } =
    LibraryCharts[result?.library as LibraryChartsKeys] || {};

  const code = lcode
    ?.replace(
      /{{chartData}}/g,
      JSON.stringify(result?.object.chartData, null, 2)
    )
    .replace(
      /{{chartConfig}}/g,
      JSON.stringify(result?.object.chartConfig, null, 2)
    )
    .replace(/{{title}}/g, result?.object.title as string)
    .replace(/{{description}}/g, result?.object.description as string);
  return (
    <div>
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-2xl font-bold mt-8 md:mt-0 flex items-center gap-2">
          Result
          {isLoading && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin w-6 h-6"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#fff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3a9 9 0 1 0 9 9" />
              </svg>
            </div>
          )}
        </h2>

        {error && (
          <p className="text-red-500">
            Ocurrio un error, por favor intenta de nuevo
          </p>
        )}
      </div>
      {result && !isLoading && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="codigo">Code</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" forceMount hidden={activeTab !== "chart"}>
            {Component && <Component data={result} />}
          </TabsContent>
          <TabsContent
            value="codigo"
            forceMount
            hidden={activeTab !== "codigo"}
          >
            <Code filename="Chart.tsx" code={code as string} />
          </TabsContent>
          <TabsContent
            value="json"
            forceMount
            hidden={activeTab !== "json"}
          >
            <Code filename="data.json" code={JSON.stringify(result?.object, null, 2) as string} language="json" />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
