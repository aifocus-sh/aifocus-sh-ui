"use client";
import { XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { experimental_useObject as useObject } from "ai/react";
import { ChevronRightIcon } from "lucide-react";
import { CustomSelect } from "@/components/select";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slider } from "@/components/ui/slider";
import ViewResults from "@/components/twitter-thread/view-results";
import { TwitterThread } from "@/app/api/ai-writer/twitter-thread/schema";
import { toast } from "react-toastify";

const schema = z.object({
  topic: z.string().min(2),
  tone: z.enum([
    "excited",
    "professional",
    "funny",
    "encouraging",
    "dramatic",
    "witty",
    "sarcastic",
    "engaging",
    "creative",
  ]),
  quantityTweets: z.number().min(2).max(10),
  quantity: z.number().min(1).max(5),
  temperature: z.number().min(0).max(1),
});

export default function TwitterThreadGenerator() {
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/ai-writer/twitter-thread",
    schema: TwitterThread,
    onError: (error) => {
      stop();
      toast.info(JSON.parse(error.message as any).error);
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      topic: "",
      tone: "excited",
      quantityTweets: 2,
      quantity: 2,
      temperature: 0.7,
    },
    resolver: zodResolver(schema),
  });

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      <div className="col-span-2">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-3xl font-bold  flex items-center gap-2">
              Threads Generator{" "}
              <XIcon className="w-9 h-9 text-white" stroke={"#fff"} />
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)}>
          <Controller
            control={control}
            name="topic"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <label htmlFor="article-to-x-text-area" className="block mb-2 ">
                  Topic <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={value}
                  onChange={onChange}
                  rows={4}
                  id="article-to-x-text-area"
                  className="w-full p-4 rounded-lg shadow-lg bg-black text-white"
                  placeholder="SEO Marketing tip thread"
                ></textarea>

                {error && (
                  <p className="text-red-500 text-sm mt-1">{error.message}</p>
                )}
              </>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <Controller
                control={control}
                name="quantityTweets"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
                    <label className="block mb-2 ">
                      Number of tweets <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      value={value}
                      options={[2, 3, 4, 5, 6, 7, 8, 9, 10]}
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
                name="quantity"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
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
            </div>
            <div className="flex flex-col gap-2">
              <Controller
                control={control}
                name="tone"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
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

              <Controller
                control={control}
                name="temperature"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
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
          <Button
            className="bg-green-600 hover:bg-green-700 text-lg w-full my-12 md:mt-4"
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
          Thread
          {isLoading && (
            <Button className="bg-red-600 hover:bg-red-700 h-7" onClick={stop}>
              Stop
            </Button>
          )}
        </h1>

        <ViewResults object={object as any} />
      </div>
    </main>
  );
}
