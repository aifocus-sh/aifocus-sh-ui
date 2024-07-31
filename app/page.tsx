import Home from "@/sections/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unlocking Creativity with AIfocus.sh - Artificial Intelligence in Writing",
  description:
    "Learn how AIfocus.sh's cutting-edge AI technology empowers writers to produce high-quality content quickly and efficiently, revolutionizing the way you create digital media articles.",
  "openGraph": {
    title: "Unlocking Creativity with AIfocus.sh - Artificial Intelligence in Writing",
    description: "Learn how AIfocus.sh's cutting-edge AI technology empowers writers to produce high-quality content quickly and efficiently, revolutionizing the way you create digital media articles.",
    url: "https://aifocus.sh/",
    siteName: "AIfocus.sh",
    images: [
      {
        url: "https://aifocus.sh/images/introduction-to-aifocus-sh.jpg",
        width: 1280,
        height: 800,
      },
    ],
  }
};

export default function Page() {
  return <Home />;
}
