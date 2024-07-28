import { Metadata } from "next";
import SeoMetaTags from "@/sections/seo-meta-tags";
 
export const metadata: Metadata = {
  title: 'Generate SEO Meta Tags with AI | AIfocus.sh',
  description: 'Discover the power of artificial intelligence in generating meta tags for your digital media articles. Learn how AIfocus.sh can optimize your content creation process.',
};

export default function Page() {
  return <SeoMetaTags />
}