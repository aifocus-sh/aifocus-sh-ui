import Link from "next/link";
import { RightArrowIcon, XIcon } from "./icons";
import { Star } from "lucide-react";

export default function Tools() {
  const tools = [
    {
      name: (
        <>
          <XIcon className="w-5 h-5" /> Twitter Threads Generator{" "}
        </>
      ),
      description:
        "Convert articles to Twitter threads easily with our innovative tool.",
      link: "/twitter-threads-generator",
      popular: true,
    },
    {
      name: "CSV to graph",
      description:
        "Uses historical data to convert it to an eye-catching graph",
      link: "/text-to-graph",
    },
    {
      name: "Seo meta tags",
      description:
        "Create SEO-optimized meta tags for your service, product or page",
      link: "/generate-seo-meta-tags",
      popular: true,
    },
    {
      name: "Instagram caption",
      description: "Generate the perfect caption for your Instagram posts",
      link: "/instagram-caption",
    },
    {
      name: "Reel Script Generator",
      description: "Cut down on the time and effort it takes to create winning Instagram Reels with our powerful AI Script Generator.",
      link: "/reel-script-generator",
    },
    {
      name: "Article generator",
      description:
        "Generate an article for your service, product or page with our AI",
      link: "/article-generator",
    },
  ];
  return (
    <div className="bg-white text-black rounded-lg h-full p-4">
      <h3 className="text-2xl font-bold mb-4">Generative AI Tools</h3>

      <div className="space-y-4">
        {tools.map((tool, i) => (
          <Link
            key={`tool-${i}`}
            href={tool.link}
            className="flex justify-between items-center relative border-2 hover:border-black rounded-lg text-left cursor-pointer hover:bg-slate-100 py-2 px-3 h-auto"
            prefetch={false}
          >
            <div className="flex items-start flex-col gap-2">
              <span className="gap-2 flex items-center text-left text-md font-semibold capitalize">
                {tool.name}
              </span>
              <p className="text-gray-500 text-sm"> {tool.description}</p>
            </div>

            {tool.popular && (
              <div className="text-white text-sm bg-black rounded-full p-1 absolute right-2 top-2">
                <Star className="w-4 h-4 fill-yellow-500" />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
