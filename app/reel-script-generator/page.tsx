import { Metadata } from "next";
import ReelScriptGenerator from "@/sections/reel-script-generator";
 
export const metadata: Metadata = {
  title: 'Instagram Tiktok Youtube Reels Script Generator | Ai Focus',
  description: "Cut down on the time and effort it takes to create winning Instagram Reels with our powerful AI Script Generator. Create Instagram Reel scripts that go viral.",
};

export default function Page() {
  return <ReelScriptGenerator />
}