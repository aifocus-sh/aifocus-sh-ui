import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/utils";
import { experimental_useObject as useObject } from "ai/react";
import {
  ChevronRightIcon,
  Edit2,
  SaveAllIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface Props {
  control: any;
  watch: any;
  step: number;
  context: {
    current: {
      submitter: string;
      last_step: number;
      currentStep: number;
    };
  };
}

export default function ChooseTitle({ control, watch, step, context }: Props) {
  const [editing, setEditing] = useState<number | null>(null);
  const [valueEdit, setValueEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [listTitles, setListTitles] = useState<string[]>([]);

  const getTitles = async (action: "regenerate" | "more" = "regenerate") => {
    setLoading(true);

    if (action === "regenerate") setListTitles([]);

    const last = action === "regenerate" ? {} : { last_titles: listTitles };

    const response = await fetch("/api/ai-writer/article-generator/titles", {
      method: "POST",
      body: JSON.stringify({
        keyword: watch("keyword"),
        language: watch("language"),
        quantity: watch("quantity"),
        ...last,
      })

    });

    if  (!response.ok){
      const json = await response.json();
      setLoading(false);
      toast.info(json.error);
      return;
    }

    const json = await response.json();
    if (action === "regenerate") {
      setListTitles(json.object.titles);
    } else if (action === "more") {
      setListTitles([...listTitles, ...json.object.titles]);
    }
    setLoading(false);
  };

  const handleSave = () => {
    if (valueEdit.length >= 200) return null;

    if (editing !== null) {
      listTitles[editing] = valueEdit;
      setListTitles([...listTitles]);
    }

    setEditing(null);
    setValueEdit("");
  };

  const handleCancel = () => {
    setEditing(null);
    setValueEdit("");
  };

  const handleEdit = (index: number) => {
    setEditing(index);
    setValueEdit(listTitles[index]);
  };

  useEffect(() => {
    const loadData = async () => {
      if (
        context.current.currentStep === step &&
        context.current.last_step < step
      ) {
        await getTitles();
      }
    };

    loadData();
    // ;
  }, [context.current.currentStep]);

  return (
    <div
      className={`h-full w-full flex flex-col justify-between ${
        context.current.currentStep === step ? "block" : "hidden"
      }`}
    >
      <div>
        <h3 className="text-3xl mb-6 text-center w-full">
          Choose a title that best represents your page.
        </h3>

        <div className="w-full flex justify-between mb-6">
          <Button
            variant={"text"}
            disabled={loading}
            onClick={() => getTitles("more")}
            className="flex gap-2 items-center p-0 text-white fill-white hover:text-blue-500 hover:fill-blue-500 cursor-pointer"
          >
            <svg
              className="text-[1.5rem] w-[1em] h-[1em]"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="AutoAwesomeIcon"
            >
              <path d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"></path>
            </svg>
            Write more titles
          </Button>
          <Button
            variant={"text"}
            disabled={loading}
            onClick={() => getTitles("regenerate")}
            className="flex gap-2 items-center text-white fill-white hover:text-green-600 hover:fill-green-700 cursor-pointer mr-2"
          >
            <svg
              className="text-[1.5rem] w-[1em] h-[1em]"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ReplayIcon"
            >
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path>
            </svg>
            Write more titles
          </Button>
        </div>

        <ScrollArea className="w-full h-[calc(100vh-450px)] pr-6">
          <div className="flex flex-col gap-4">
            {listTitles.map((title, i) => (
              <Controller
                control={control}
                name={`title`}
                key={`title-${i}`}
                render={({ field: { onChange, value } }) => (
                  <div
                    className={`group w-full p-4 border-2 rounded-lg flex gap-4 items-center hover:border-green-600 cursor-pointer mr-2`}
                    onClick={() => onChange(title)}
                  >
                    <div className="h-full flex items-center">
                      <Input
                        type="radio"
                        className="w-[20px] h-[20px] accent-green-600"
                        checked={title === value}
                        onChange={() => onChange(title)}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <p
                        className={`text-lg ${
                          editing === i ? "hidden" : "block"
                        }`}
                      >
                        {title}
                      </p>
                      <div className="flex gap-2">
                        <Input
                          type={editing === i ? "text" : "hidden"}
                          name={`title`}
                          value={valueEdit}
                          className="text-lg"
                          onChange={(e) => setValueEdit(e.target.value)}
                        />
                        <div
                          className={`flex gap-2 items-center ${
                            editing === i ? "block" : "hidden"
                          }`}
                        >
                          <div
                            className="bg-white p-2 rounded-full"
                            onClick={() => handleSave()}
                          >
                            <SaveAllIcon className="w-[20px] h-[20px] fill-white text-green-600" />
                          </div>
                          <div
                            className="bg-white p-2 rounded-full"
                            onClick={() => handleCancel()}
                          >
                            <XIcon className="w-[20px] h-[20px] fill-white text-red-600" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="flex items-center gap-2 text-sm">
                          <p>
                            {editing === i
                              ? value.split(" ").length
                              : title.split(" ").length}
                          </p>
                          words
                        </span>
                        <span>{" / "}</span>
                        <span
                          className={`flex items-center gap-2 text-sm ${
                            editing === i && value.length <= 200
                              ? "text-green-600"
                              : editing === i && "text-red-600"
                          }`}
                        >
                          <p>{editing === i ? value.length : title.length}</p>
                          characters
                        </span>
                      </div>
                    </div>
                    <div
                      className={`bg-white p-2 rounded-full hidden ${
                        editing === i ? "hidden" : "group-hover:flex"
                      }`}
                      onClick={() => handleEdit(i)}
                    >
                      <Edit2 className="w-[20px] h-[20px] fill-white text-black" />
                    </div>
                  </div>
                )}
              />
            ))}

            {loading &&
              range(0, watch("quantity") - 1).map((i) => (
                <div
                  className="w-full p-4 border-2 rounded-lg flex gap-4 items-center"
                  key={`title-loader-${i}`}
                >
                  <Input type="radio" className="w-[20px] h-[20px]" />
                  <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="w-[80%] h-[20px]" />
                    <div className="flex gap-2">
                      <span className="flex items-center gap-2">
                        <Skeleton className="w-[40px] h-[20px]" />
                        words
                      </span>
                      <span>{" / "}</span>
                      <span className="flex items-center gap-2">
                        <Skeleton className="w-[40px] h-[20px]" />
                        characters
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          disabled={loading}
          className="bg-white hover:bg-gray-100 text-black min-h-[50px] text-lg"
          onClick={() => context.current.submitter = "prev"}
        >
          Previous
        </Button>
        <Button
          disabled={loading || watch("title") === ""}
          className="bg-green-600 hover:bg-green-700 min-h-[50px] text-lg"
          onClick={() => (context.current.submitter = "next")}
        >
          Generate Intro Paragraph
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
