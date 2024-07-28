import TwitterThreadGenerator from "@/sections/twitter-threads-generator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Tweet Threads with Artificial Intelligence | Aifocus.sh",
  description:
    "Get more done in less time! aifocus.sh's AI-powered thread generator helps you create high-quality tweet threads from your article, freeing up time for other tasks.",
};

export default function Page() {
  return <TwitterThreadGenerator />;
}
