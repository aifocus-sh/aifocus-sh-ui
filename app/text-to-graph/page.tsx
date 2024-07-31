import TextToGraph from "@/sections/text-to-graph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create Charts with Recharts and Shadcn | AIfocus.sh',
  description: 'Discover how AIfocus.sh leverages artificial intelligence to convert historical data into engaging graphs, empowering digital media writers and publishers.',
};

export default function Page() {
  return <TextToGraph />
}