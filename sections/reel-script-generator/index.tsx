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
import { ReelScriptGeneratorSchema } from "@/app/api/ai-writer/reel-script-generator/schema";
import Image from "next/image";

const schema = z.object({
  title: z.string().min(2),
  tone: z.enum([
    "casual",
    "dry",
    "edgy",
    "formal",
    "authoritative",
    "caring",
    "cheerful",
    "coarse",
    "conservative",
    "conversational",
    "convincing",
    "creative",
    "enthusiastic",
    "expository",
    "frank",
    "friendly",
    "fun",
    "funny",
    "humble",
    "humorous",
    "informative",
    "inspirational",
    "irreverent",
    "journalistic",
    "joyful",
    "matteroffact",
    "nostalgic",
    "objective",
    "passionate",
    "poetic",
    "playful",
    "professional",
    "provocative",
    "quirky",
    "respectful",
    "romantic",
    "sarcastic",
    "serious",
    "smart",
    "snarky",
    "subjective",
    "sympathetic",
    "thoughtful",
    "trendy",
    "trustworthy",
    "unapologetic",
    "upbeat",
    "witty",
    "worried",
  ]),
  time: z.enum(["short", "medium", "long"]),
  description: z.string().min(2),
  temperature: z.number().min(0).max(1),
});

export default function ReelScriptGenerator() {
  const [clonedVal, setClonedVal] = useState("");

  const { object, submit, isLoading, stop } = useObject({
    api: "/api/ai-writer/reel-script-generator",
    schema: ReelScriptGeneratorSchema,
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title:
        "La deforestación hace saltar las alarmas en la Amazonia, ¿cómo podemos frenarla?",
      tone: "friendly",
      time: "long",
      description:
        "Considerada el pulmón del mundo, la selva amazónica ha perdido desde 1970 una superficie forestal superior al tamaño de Francia, según datos de Greenpeace. Detrás de esta desaparición masiva de bosque tropical se encuentra la deforestación, en gran medida ocasionada por la mano del hombre. A continuación, exponemos los preocupantes datos, las consecuencias para el planeta y el ser humano y qué soluciones se plantean. Con una superficie de alrededor de siete millones de km2, la Amazonia es el bosque tropical más grande del planeta. En concreto, se extiende por nueve países, entre los que destacan Bolivia, Perú, Colombia y, especialmente, Brasil —alberga el 60 %—. Declarada en 2011 como una de las siete maravillas naturales del mundo, está considerada el pulmón del planeta, además de una reserva única de biodiversidad y el hogar de culturas indígenas ancestrales que nos ayudan a comprender mejor quiénes somos. Desde 1970, según datos de Greenpeace, solo la Amazonia brasileña ha perdido una superficie forestal superior al tamaño de Francia. Este mismo año, de acuerdo con el Instituto Nacional de Investigaciones Espaciales (INPE) de Brasil, se batía el record de deforestación en un mes de abril con 580 km2 perdidos, un 42 % más que en el mismo mes de 2020. Un dato poco halagüeño si tenemos en cuenta que la temporada seca, la de mayor destrucción, empieza en mayo y alcanza su apogeo en agosto. Las cifras son especialmente preocupantes, además, porque duplican las de hace solo unos años. En 2012 la deforestación en la Amazonia brasileña se redujo hasta los 4.571 km2, la cifra más baja desde que el INPE comenzara a realizar mediciones por satélite en 1988 a través del programa TerraBrasilis. La cifra más alta, en cambio, se dio en 1995 con 29.059 km2 de selva desaparecidos, seguida por los 27.772 km2 de 2004. A partir de entonces, con la llegada de Lula da Silva al gobierno, esa cifra fue cayendo hasta alcanzar el mínimo citado de 2012 para, a continuación, rebotar hasta los alarmantes datos actuales.",
      temperature: 0.7,
    },
    resolver: zodResolver(schema),
  });

  console.log(object);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-3xl font-bold  flex items-center gap-2">
              Reel Script Generator
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)}>
          <div className="w-full">
            <div className="flex gap-6 w-full flex-col md:flex-row">
              <Controller
                control={control}
                name="title"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="w-full">
                    <label className="block mb-2 ">
                      Reel Title <span className="text-red-500">*</span>
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
                        "casual",
                        "dry",
                        "edgy",
                        "formal",
                        "authoritative",
                        "caring",
                        "cheerful",
                        "coarse",
                        "conservative",
                        "conversational",
                        "convincing",
                        "creative",
                        "enthusiastic",
                        "expository",
                        "frank",
                        "friendly",
                        "fun",
                        "funny",
                        "humble",
                        "humorous",
                        "informative",
                        "inspirational",
                        "irreverent",
                        "journalistic",
                        "joyful",
                        "matteroffact",
                        "nostalgic",
                        "objective",
                        "passionate",
                        "poetic",
                        "playful",
                        "professional",
                        "provocative",
                        "quirky",
                        "respectful",
                        "romantic",
                        "sarcastic",
                        "serious",
                        "smart",
                        "snarky",
                        "subjective",
                        "sympathetic",
                        "thoughtful",
                        "trendy",
                        "trustworthy",
                        "unapologetic",
                        "upbeat",
                        "witty",
                        "worried",
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
            <div className="flex gap-6 w-full mt-6 flex-col md:flex-row">
              <Controller
                control={control}
                name="time"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="w-full">
                    <label className="block mb-2 ">
                      Script Length/Video Length{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      value={value}
                      options={["short", "medium", "long"]}
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
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex align-center justify-between">
                      <label htmlFor="temperature" className="block">
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
                      <p className="text-red-500 text-sm">{error.message}</p>
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

        <div className="w-full min-h-[500px] bg-slate-900 rounded-lg p-4 flex flex-col gap-2">
          <p>
            <strong>Title: </strong>
            {object?.title}
          </p>
          <p>
            <strong>Tone: </strong>
            {object?.tone}
          </p>
          <p>
            <strong>Time: </strong>
            {object?.time}
          </p>

          <p>
            <strong>Main audio: </strong>
            {object?.main_audio}
          </p>

          {object?.script?.map((scene, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 bg-slate-800 p-4 rounded-lg"
            >
              <p>
                <strong>Scene {index + 1}:</strong>
                {scene?.text}
              </p>
              <p>
                <strong>Media: </strong> {scene?.settings?.type}
              </p>
              <p>
                <strong>category: </strong> {scene?.settings?.category}
              </p>
              <p>
                <strong>Search terms (Pixabay): </strong>{" "}
                {scene?.settings?.tags_of_image}
              </p>
              <p>
                <strong>Duration:</strong> {scene?.duration} seconds
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
