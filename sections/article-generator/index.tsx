"use client";

import React, { Fragment, useState } from "react";
import { Resolver, useForm } from "react-hook-form";

import StepPagination from "./step-pagination";
import WriteKeyword from "./write-keyword";
import ChooseTitle from "./choose-title";
import ChooseIntoParagraph from "./choose-into-paragraph";
import ChooseHeadings from "./choose-headings";

type FormValues = {
  keyword: string;
  language: string;
  quantity: number;
  title: string;
  paragraph: string;
  headings: string[];
};

const steps = [
  {
    title: "Target Keyword",
    description: "",
  },
  {
    title: "Page Title",
    description: "Select your Title",
  },
  {
    title: "Intro Paragraph",
    description: "Select your Paragraph",
  },
  {
    title: "Headings",
    description: "Select your Headings",
  },
];

type ResolverContext = { currentStep: number; submitter: string };

export function ArticleGenerator() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const context = React.useRef({ currentStep, submitter: "", last_step: 1 });

  const resolver: Resolver<FormValues> = (data, context) => {
    const ctx: ResolverContext = (context as any).current;

    if (ctx.currentStep === 1 && !data.keyword && ctx.submitter === "next") {
      const result = {
        values: {},
        errors: {
          keyword: {
            type: "required",
            message:
              "Before you continue, you have to write down the keywords you want to rank for.",
          },
        },
      };
      return result;
    } else if (
      ctx.currentStep === 2 &&
      !data.title &&
      ctx.submitter === "next"
    ) {
      const result = {
        values: {},
        errors: {
          title: {
            type: "required",
            message:
              "Before you continue, you have to write down the title of your article.",
          },
        },
      };

      return result;
    } else if (
      ctx.currentStep === 3 &&
      !data.paragraph &&
      ctx.submitter === "next"
    ) {
      const result = {
        values: {},
        errors: {
          paragraph: {
            type: "required",
            message:
              "Before you continue, you have to write down the paragraph of your article.",
          },
        },
      };
      return result;
    }

    return { values: data, errors: {} };
  };

  const { control, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      keyword: "Top tourist spots in 2024",
      language: "english",
      quantity: 2,
      title: "",
      paragraph: "",
      headings: [],
    },
    context,
    resolver,
  });

  const onSubmit = (e: React.FormEvent) => {
    const submitter = context.current.submitter;
    const doHandleSubmit = handleSubmit(
      // onValid callback
      (data) => {
        const newStep =
          submitter === "prev" ? currentStep - 1 : currentStep + 1;

        if (newStep > steps.length) {
          alert(JSON.stringify(data));
        } else {
          context.current.currentStep = newStep;
          context.current.last_step = currentStep;
          setCurrentStep(newStep);
        }
      },

      // onInvalid callback
      () => {}
    );
    doHandleSubmit(e);
  };

  return (
    <div className="w-full">
      <div className="rounded-lg mt-12">
        <StepPagination steps={steps} currentStep={currentStep} watch={watch} />

        <form
          onSubmit={onSubmit}
          className="w-full h-[calc(100vh-270px)] flex flex-col justify-between"
        >
          <WriteKeyword control={control} step={1} context={context} />

          <ChooseTitle
            control={control}
            step={2}
            watch={watch}
            context={context}
          />

          <ChooseIntoParagraph
            control={control}
            step={3}
            watch={watch}
            context={context}
          />

          <ChooseHeadings
            control={control}
            step={4}
            watch={watch}
            context={context}
          />
          {/* <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button
                disabled={loading}
                className="bg-white hover:bg-gray-100 text-black min-h-[50px] text-lg"
                onClick={() => (context.current.submitter = "prev")}
              >
                Previous
              </Button>
            ) : (
              <div />
            )}
            {currentStep < 4 ? (
              <Button
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 min-h-[50px] text-lg"
                onClick={() => (context.current.submitter = "next")}
              >
                {currentStep === 1
                  ? "Write For Me"
                  : currentStep === 2
                  ? "Generate Intro Paragraph"
                  : currentStep === 3
                  ? "Generate Headings"
                  : "Write my article"}

                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 min-h-[50px] text-lg"
              >
                Write my article
              </Button>
            )}
          </div> */}
        </form>
      </div>
    </div>
  );
}
