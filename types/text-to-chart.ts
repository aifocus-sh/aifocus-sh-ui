import { LibraryChartsKeys } from "@/components/chart-view/library-charts";

export interface GenerateObjectType {
  object: Object;
  finishReason: string;
  library: LibraryChartsKeys;
  usage: Usage;
  warnings: any[];
  rawResponse: RawResponse;
}

export interface Object {
  chartData: ChartDaum[];
  dataKeyLabel: string;
  title: string;
  description: string;
  chartConfig: {
    [key: string]: { label: string; color: string };
  };
}

export type ChartDaum = Record<string, any>;

export interface Usage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface RawResponse {
  headers: Headers;
}

export interface Headers {
  "content-length": string;
  "content-type": string;
  date: string;
}
