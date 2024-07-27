"use client";
import { ResultView } from "@/components/chart-view";
import { CustomSelect } from "@/components/select";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { GenerateObjectType } from "@/types/text-to-chart";
import {
  LibraryCharts,
  LibraryChartsKeys,
  LibraryChartsValue,
} from "../../components/chart-view/library-charts";

const schema = z.object({
  prompt: z.string().min(1, { message: "Please enter a prompt" }),
  library: z.string().min(1, { message: "Please select a chart type" }),
});

export default function TextoAGrafico() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [result, setResult] = useState<GenerateObjectType | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prompt: "",
      library: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);
    setResult(null);
    setError(false);
    const res = await fetch("/api/text-to-chart", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setLoading(false);
      setError(true);
      return;
    }

    const generated = await res.json();
    setResult({
      ...generated,
      library: data.library as string,
    });
    setLoading(false);
  };

  const selectOptions = Object.keys(LibraryCharts).map((key) => ({
    ...LibraryCharts[key as LibraryChartsKeys],
    code: "",
  }));

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <div>
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-3xl font-bold  flex items-center gap-2">
            Texto a Chart <TrendingUp className="h-8 w-8" />
          </h1>
          <div className="flex gap-2">
            <Button className="bg-white hover:bg-gray-100 text-black text-sm h-6 cursor-not-allowed">
              Beta
            </Button>
            {/* <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm h-6 cursor-not-allowed">
                Español
              </Button> */}
            <Button className="bg-teal-500 hover:bg-teal-600 text-white text-sm h-6 cursor-not-allowed">
              Inglés
            </Button>
          </div>
          <span className="text-sm">
            Type the text or paste the csv content separated by commas to
            generate a chart
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="library"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="mb-4">
                <CustomSelect
                  value={value}
                  onChange={onChange}
                  options={selectOptions}
                />
                {error && (
                  <span className="text-red-300 text-sm">{error.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="prompt"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <textarea
                  rows={6}
                  onChange={onChange}
                  value={value}
                  id="article-to-x-text-area"
                  className="w-full p-4 rounded-lg shadow-lg bg-black text-white"
                />
                {error && (
                  <span className="text-red-300 text-sm">{error.message}</span>
                )}
              </>
            )}
          />

          <Button
            className="w-full mt-4 bg-teal-500 hover:bg-teal-600"
            type="submit"
          >
            Generar Codigo
          </Button>

          <div>
            <h2 className="text-xl font-bold mt-8 mb-4 flex items-center gap-2">
              Ejemplos
            </h2>

            <div className="flex flex-col gap-4">
              <Controller
                control={control}
                name="prompt"
                render={({ field: { onChange } }) => (
                  <p
                    className="text-sm bg-gray-600 p-4 rounded whitespace-pre cursor-pointer hover:bg-gray-700"
                    onClick={() => {
                      setValue("library", "AreaChartStacked");
                      onChange(
                        "month,autos_nuevos,autos_usados\nJanuary,150,200\nFebruary,180,220\nMarch,10,210\nApril,190,230\nMay,200,12\nJune,210,250"
                      );
                    }}
                  >
                    {
                      "month,autos_nuevos,autos_usados\nJanuary,150,200\nFebruary,180,220\nMarch,10,210\nApril,190,230\nMay,200,12\nJune,210,250"
                    }
                  </p>
                )}
              />

              <Controller
                control={control}
                name="prompt"
                render={({ field: { onChange } }) => (
                  <p
                    className="text-sm bg-gray-600 p-4 rounded whitespace-pre cursor-pointer hover:bg-gray-700"
                    onClick={() => {
                      setValue("library", "PieDonutWithText");
                      onChange(
                        "browser,visitors\nchrome,275\nsafari,200\nfirefox,287\nedge,173\nother,190\nopera,145\nbrave,125\ninternet explorer,75\nvivaldi,60\nmaxthon,50\n"
                      );
                    }}
                  >
                    {
                      "browser,visitors\nchrome,275\nsafari,200\nfirefox,287\nedge,173\nother,190\nopera,145\nbrave,125\ninternet explorer,75\nvivaldi,60\nmaxthon,50\n"
                    }
                  </p>
                )}
              />

              <Controller
                control={control}
                name="prompt"
                render={({ field: { onChange } }) => (
                  <p
                    className="text-sm bg-gray-600 p-4 rounded whitespace-pre cursor-pointer hover:bg-gray-700"
                    onClick={() => {
                      setValue("library", "SimpleAreaChart");
                      onChange(
                        "month,visitors\nJanuary,186\nFebruary,305\nMarch,237\nApril,73\nMay,209\nJune,214\nJuly,225\nAugust,180\nSeptember,195\nOctober,210\nNovember,230\nDecember,250"
                      );
                    }}
                  >
                    {
                      "month,visitors\nJanuary,186\nFebruary,305\nMarch,237\nApril,73\nMay,209\nJune,214\nJuly,225\nAugust,180\nSeptember,195\nOctober,210\nNovember,230\nDecember,250"
                    }
                  </p>
                )}
              />

            </div>
          </div>
        </form>
      </div>
      <ResultView isLoading={loading} result={result} error={error} />
    </main>
  );
}
