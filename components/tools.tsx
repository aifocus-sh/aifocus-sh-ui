import Link from "next/link";
import { RightArrowIcon, XIcon } from "./icons";

export default function Tools() {
  const tools = [
    {
      name: (
        <>
          Article to <XIcon className="w-5 h-5" />
        </>
      ),
      type: "Generación de texto",
      link: "/articulo-a-x",
    },
    {
      name: "Describe image",
      type: "Descripcion de imagen",
      link: "/describir-imagen",
    },
    {
      name: "Guines para reels",
      type: "Generación de texto",
      link: "/articulo-a-guion-para-reels",
    },
    {
      name: "Ai SEO toolkit",
      type: "Generación de texto",
      link: "/toolkit-ai-seo",
    },
  ];
  return (
    <div className="bg-white text-black rounded-lg h-full py-6">
      <h3 className="text-4xl font-bold mb-4 px-6">Tools</h3>

      <div className="space-y-4">
        {tools.map((tool, i) => (
          <Link
            key={`tool-${i}`}
            href={tool.link}
            className="flex justify-between h-16 items-center border-b-2 text-left cursor-pointer hover:bg-slate-100 p-6 md:h-10"
            prefetch={false}
          >
            <div className="flex items-start flex-col gap-1 md:flex-row md:items-center">
              <span className="gap-2 flex items-center text-left text-lg font-semibold">
                {tool.name}
              </span>
              <p className="text-gray-500">/ {tool.type}</p>
            </div>

            <RightArrowIcon className="w-6 h-6" />
          </Link>
        ))}
      </div>
    </div>
  );
}
