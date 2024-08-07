import Link from "next/link";
import { RightArrowIcon, XIcon } from "./icons";
import { Star } from "lucide-react";

export default function Tools() {
  const tools = [
    {
      name: (
        <>
          <XIcon className="w-5 h-5" />
          Threads Generator{" "}
        </>
      ),
      description:
        "Generate twitter thread easily by typing only the topic as context",
      link: "/twitter-threads-generator",
      popular: true,
    },
    {
      name: "Instagram caption",
      description: "Generate the perfect caption for your Instagram posts",
      link: "/instagram-caption",
      popular: true,
    },
    {
      name: "Seo meta tags",
      description: "Optimize your SEO content with the meta tag generator",
      link: "/generate-seo-meta-tags",
    },
    {
      name: "CSV to Graph",
      description:
        "Use the AI to generate a graph from a CSV file of historical data.",
      link: "/text-to-graph",
      beta: true,
    },
    {
      name: "Article generator",
      description:
        "If you ran out of ideas, we recommend you to generate an article always thinking about the Keyword you want to position.",
      link: "/article-generator",
      beta: true,
    },
    {
      name: "Reel Script Generator",
      description:
        "Cut down on the time and effort it takes to create winning Instagram Reels with our powerful AI Script Generator.",
      link: "/reel-script-generator",
      soon: true,
    },
  ];
  return (
    <div className="bg-white text-black rounded-lg h-full p-4">
      <h3 className="text-2xl font-bold mb-4">Generative AI Tools</h3>

      <div className="space-y-4">
        {tools.map((tool, i) => (
          <Link
            key={`tool-${i}`}
            href={tool.soon ? "#" : tool.link}
            className={`flex justify-between items-center relative border-2 hover:border-yellow-500 rounded-lg text-left cursor-pointer hover:bg-slate-100 py-2 px-3 h-auto ${
              tool.soon ? "opacity-50" : ""
            }`}
            prefetch={false}
          >
            <div className="flex items-start flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="gap-2 flex items-center text-left text-md font-semibold capitalize">
                  {tool.name}
                </span>
                {tool.soon && (
                  <span className="py-[1px] px-[4px] bg-green-500 rounded-md text-black">
                    Soon
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm">
                {" "}
                {tool.beta && (
                  <span className="py-[1px] px-[4px] bg-yellow-500 rounded-md text-black">
                    Beta
                  </span>
                )}{" "}
                {tool.description}
              </p>
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
