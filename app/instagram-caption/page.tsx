import { Metadata } from "next";
import InstagramCaption from "@/sections/instagram-caption";
 
export const metadata: Metadata = {
  title: 'Unlock the Power of AI-generated Captions | Generate Instagram Post Captions',
  description: "Get the most out of your Instagram content with our AI-generated caption generator. Say goodbye to writer's block and hello to improved SEO performance!",
};

export default function Page() {
  return <InstagramCaption />
}