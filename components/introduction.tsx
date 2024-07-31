import Image from "next/image";
import { MegaphoneIcon } from "./icons";

export default function Introduction() {
  return (
    <div className="bg-[#fec800] p-4 rounded-lg text-black relative min-h-[750px]">
      <h2 className="text-4xl font-bold mb-4">Introduction AIfocus.sh</h2>
      {/* <div className="w-full h-48 bg-black rounded-full" /> */}

      <div className="flex flex-col justify-between h-full">
        <div className="mb-16 md:mb-0">
          <Image
            src="/images/deep-mind.webp"
            alt="AIfocus"
            width={300}
            height={300}
            className="w-full h-60 rounded-lg object-cover mb-4"
          />
          <p className="text-lg">
            AIfocus is a platform designed to offer a set of tools that help
            improve and streamline the processes of writing and publishing
            digital media articles through the use of artificial intelligence.
          </p>
          <br />
          <p className="text-lg">
            AIfocus focuses on optimizing your creative and productive
            processes, providing comprehensive solutions that range from content
            generation to productivity improvement.
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 absolute bottom-4">
          <MegaphoneIcon className="w-4 h-4" />
          <span className="text-sm">Llama 3</span>
          <span className="text-sm text-gray-700">— Generative text</span>
        </div>
      </div>
    </div>
  );
}
