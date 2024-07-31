import Image from "next/image";
import { ClipboardIcon } from "../icons";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface ViewResultsProps {
  object: Object;
}

export default function ViewResults({ object }: ViewResultsProps) {
  const copiarTextoAlPortapapeles = (id: string, texto: string) => {
    navigator.clipboard.writeText(texto).then(() => {
      console.log(`texto copiado del id: ${id}`);
    });
  };
  return (
    <Accordion
      type="multiple"
      className="w-full mt-6 rounded-lg"
      defaultValue={["tweet-principal-0"]}
    >
      {object?.examples?.map((item, index) => (
        <AccordionItem
          value={`tweet-principal-${index}`}
          key={`tweet-principal-${index}`}
        >
          <AccordionHeader className="cursor-auto">
            <div className="w-full">
              <div className="flex justify-between items-center mb-4">
                <div className="w-full text-white flex gap-4 items-center">
                  <Image
                    src="/logo.png"
                    alt="Aifocus logo"
                    className="w-10 h-10 rounded-full bg-white"
                  />
                  <div>
                    <p className="font-bold text-base">AIfocus</p>
                    <p className="text-sm text-gray-400">@aifocus_sh</p>
                  </div>
                </div>
                <div
                  className="w-10 h-10 bg-white flex justify-center items-center rounded-full cursor-pointer text-black p-1"
                  onClick={() =>
                    copiarTextoAlPortapapeles(
                      "tweet-principal",
                      item?.main_tweet as string
                    )
                  }
                >
                  <ClipboardIcon className="w-7 h-7" stroke={"#000"} />
                </div>
              </div>
              <p className="break-words mt-2">{item?.main_tweet}</p>
              <div className="h-[30px]" />
            </div>

            <AccordionTrigger className="w-full h-full bg-white rounded-sm text-black p-1">
              View full thread
            </AccordionTrigger>

            {/* <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 data-[state=open]:rotate-180" /> */}
          </AccordionHeader>
          <AccordionContent>
            {item?.thread?.map(({ tweet }: any, index) => (
              <div key={`tweet-thread-${index}`} className="flex gap-4">
                <div className="flex flex-col items-center max-w-[40px] w-full">
                  <div
                    className={
                      index === 0
                        ? "w-[2px] h-[3.5rem] bg-white"
                        : "w-[2px] h-[10px] bg-white"
                    }
                  ></div>
                  <Image
                    src="/logo.png"
                    alt="Aifocus logo"
                    className="w-10 h-10 rounded-full bg-white"
                  />
                  <div className="w-[2px] h-full bg-white"></div>
                </div>

                <div className={index === 0 ? "pt-6" : ""}>
                  <div className="flex content-between mt-[8px]">
                    <div className="w-full text-white flex gap-2 items-center">
                      <p className="font-bold text-base">AIfocus</p>
                      <p className="text-sm text-gray-400">@aifocus_sh</p>
                    </div>
                    <div
                      className="bg-white flex justify-center items-center rounded-full cursor-pointer text-black p-1"
                      onClick={() =>
                        copiarTextoAlPortapapeles(
                          `tweet-thread-${index}`,
                          tweet
                        )
                      }
                    >
                      <ClipboardIcon className="w-7 h-7" stroke={"#000"} />
                    </div>
                  </div>
                  <p className="break-words mt-2">{tweet}</p>
                  <div className="h-[30px]" />
                </div>
              </div>
            ))}
          </AccordionContent>
          {object?.examples?.length !== index + 1 && (
            <div className="w-full flex items-center my-8">
              <hr className="w-full" />
              <span className="text-white w-full text-center">
                option {index + 2}{" "}
              </span>
              <hr className="w-full" />
            </div>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export interface Object {
  examples: Example[];
}

export interface Example {
  main_tweet: string;
  thread: Thread[];
}

export interface Thread {
  tweet: string;
}
