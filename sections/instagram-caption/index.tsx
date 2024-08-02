"use client";
import { Button } from "@/components/ui/button";
import { experimental_useObject as useObject } from "ai/react";
import { ChevronRightIcon } from "lucide-react";
import { CustomSelect } from "@/components/select";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { InstagramCaptionSchema } from "@/app/api/ai-writer/instagram-caption/schema";
import { toast } from "react-toastify";

const schema = z.object({
  title: z.string().min(2),
  tone: z.string().min(2),
  description: z.string().min(2),
  quantity: z.number().min(1).max(5),
  temperature: z.number().min(0).max(1),
});

export default function InstagramCaption() {
  const [clonedVal, setClonedVal] = useState("");

  const { object, submit, isLoading, stop } = useObject({
    api: "/api/ai-writer/instagram-caption",
    schema: InstagramCaptionSchema,
    onError: (error) => {
      stop();
      toast.info(JSON.parse(error.message as any).error);
    }
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      tone: "excited",
      description: "",
      quantity: 2,
      temperature: 0.7,
    },
    resolver: zodResolver(schema),
  });

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      <div className="col-span-2">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-3xl font-bold  flex items-center gap-2">
              Generate Captions for Instagram Posts
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)}>
          <div className="w-full">
            <div className="flex gap-6 w-full">
              <Controller
                control={control}
                name="title"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="w-full">
                    <label className="block mb-2 ">
                      Post Title <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="w-full p-2 rounded-lg shadow-lg bg-black text-white special-border"
                      placeholder="Enter the keyword or phrase you want to rank for"
                    />

                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="tone"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="w-full">
                    <label className="block mb-2 ">
                      Tone of Voice <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      value={value}
                      options={[
                        "excited",
                        "professional",
                        "funny",
                        "encouraging",
                        "dramatic",
                        "witty",
                        "sarcastic",
                        "engaging",
                        "creative",
                      ]}
                      onChange={onChange}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex gap-6 w-full mt-6">
              <Controller
                control={control}
                name="quantity"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="w-full">
                    <label className="block mb-2 ">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      value={value}
                      options={[1, 2, 3, 4, 5]}
                      onChange={(value) => onChange(parseInt(value))}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="temperature"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="mt-2 w-full">
                    <div className="flex align-center justify-between">
                      <label htmlFor="temperature" className="block mb-2 ">
                        Temperature
                      </label>
                      <p className="text-sm text-gray-200">{value}</p>
                    </div>
                    <Slider
                      id="temperature"
                      value={[value]}
                      onValueChange={(v) => onChange(v[0])}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-full h-full"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <label
                  htmlFor="article-to-x-text-area"
                  className="block mb-2 mt-8"
                >
                  Post Description <span className="text-red-500">*</span>
                </label>
                <div
                  className="grid text-sm after:px-3.5 after:py-2.5 [&>textarea]:text-inherit after:text-inherit [&>textarea]:resize-none [&>textarea]:overflow-hidden [&>textarea]:[grid-area:1/1/2/2] after:[grid-area:1/1/2/2] after:whitespace-pre-wrap after:invisible after:content-[attr(data-cloned-val)_'_'] after:border"
                  data-cloned-val={clonedVal}
                >
                  <textarea
                    value={value}
                    onChange={onChange}
                    rows={4}
                    onInput={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setClonedVal(event.target.value)
                    }
                    id="article-to-x-text-area"
                    className="w-full p-4 resize rounded-lg shadow-lg bg-black text-white"
                    placeholder="Example: SEO Marketing tip thread"
                  ></textarea>

                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                  )}
                </div>
              </>
            )}
          />

          <Button
            variant={"success"}
            className="w-full my-12 md:mt-4"
            type="submit"
            disabled={isLoading}
          >
            Write for me
            {isLoading ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin w-6 h-6 ml-2"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 3a9 9 0 1 0 9 9" />
                </svg>
              </>
            ) : (
              <ChevronRightIcon className="w-6 h-6 ml-2" />
            )}
          </Button>
        </form>
      </div>
      <div className="md:overflow-auto md:pr-4 md:h-[calc(100vh-120px)]">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          Preview
          {isLoading && (
            <Button className="bg-red-600 hover:bg-red-700 h-7" onClick={stop}>
              Stop
            </Button>
          )}
        </h1>

        {object?.examples?.map((item, index) => (
          <div
            className="flex flex-col gap-4 border border-gray-700 rounded-lg p-4 mb-4"
            key={`example-${index}`}
          >
            <div>
              <span className="font-bold">Title: </span>
              {item?.title}
            </div>
            <div>
              <span className="font-bold">Description: </span>
              {item?.description}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
