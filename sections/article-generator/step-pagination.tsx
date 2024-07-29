import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";

interface Step {
  steps: {
    title: string;
    description: string;
  }[];
  currentStep: number;
  watch: any;
}

export default function StepPagination({ steps, currentStep, watch }: Step) {
  return (
    <div className="w-full flex flex-row items-center mb-[50px]">
      {steps.map((step, index) => (
        <Fragment key={`step-${index}`}>
          {index !== 0 && <Separator className="flex-1" />}

          <div className="px-2">
            <div className="cursor-default flex items-center relative ">
              {currentStep >= index + 1 && currentStep !== index + 1 ? (
                <svg
                  className="text-green-500 fill-green-500 text-[1.5rem] w-[1em] h-[1em]"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="CheckCircleIcon"
                >
                  <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"></path>
                </svg>
              ) : (
                <div
                  className={`w-[2em] h-[1.5em] rounded-full flex items-center justify-center font-bold ${
                    currentStep >= index + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
              )}
              <div className="w-full flex flex-col ml-4">
                <span className="text-sm font-bold">{step.title}</span>
                <div className="text-sm text-nowrap text-ellipsis w-[150px] overflow-hidden">
                  {index === 0 ? watch("keyword") : step.description}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
