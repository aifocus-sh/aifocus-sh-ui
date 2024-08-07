import Link from "next/link";
import { Tally4Icon } from "./icons";
import Image from "next/image";

export default function Broadcast() {
  function formatNumber(num: number): string {
    return num.toLocaleString("de-DE");
  }

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="bg-inherit text-white border-2 border-white p-6 rounded-lg h-full">
        <div className="flex items-center justify-between">
          <span className="text-sm bg-white text-black px-2 py-1 rounded-full">
            What's next?
          </span>
        </div>
        <h3 className="text-2xl font-bold mt-4">
          Generator of articles on solutions to Javascript problems
        </h3>

        <p className="text-lg mt-4">
          This project aims to create an automated system to generate and
          publish generate and publish articles about common JavaScript problems
          and their solutions. their solutions. The articles will be optimized
          for SEO and will be accompanied with relevant images obtained from
          Pixabay. The project seeks to evaluate the impact of AI-generated
          content in terms of revenue and engagement, sharing the results
          anonymously. engagement, sharing the results anonymously.
        </p>

        <Image
          src="/images/deep-mind-news.jpg"
          width={500}
          height={160}
          alt="Photo by Google DeepMind: https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-how-ai-accountability-is-a-strong-foundation-in-a-world-of-unpredictability-it-was-created-by-artist-champ-17483811/"
          className="w-full h-40 object-cover mt-4 rounded-lg"
        />
      </div>
    </div>
  );
}
