import { CustomSelect } from "@/components/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRightIcon } from "lucide-react";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  step: number;
  context: {
    current: {
      submitter: string;
      last_step: number;
      currentStep: number;
    };
  };
}

export default function WriteKeyword({ control, step, context }: Props) {
  return (
    <div
      className={`h-full w-full flex flex-col justify-between ${
        context.current.currentStep === step ? "block" : "hidden"
      }`}
    >
      <div>
        <h3 className="text-3xl mb-4 text-center w-full">
          ✍️ Tell us what you want to rank for
        </h3>

        <div className="flex gap-4 items-center w-full">
          <Controller
            control={control}
            name="keyword"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="w-full relative">
                <Label htmlFor="name">What will we write about today?</Label>
                <Input
                  id="name"
                  name="name"
                  value={value}
                  onChange={onChange}
                  className="w-full h-[50px] mt-2"
                  placeholder="Top tourist spots in 2024"
                  autoComplete="off"
                />
                {error && (
                  <p className="text-red-500 absolute">{error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="language"
            render={({ field: { onChange, value } }) => (
              <div>
                <Label htmlFor="language">Language</Label>
                <CustomSelect
                  onChange={onChange}
                  value={value}
                  options={[ "english", "spanish"]}
                  placeholder="Select your language"
                  className="h-[50px] mt-2"
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, value } }) => (
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <CustomSelect
                  onChange={(e) => onChange(Number(e))}
                  value={value}
                  options={[1, 2, 3]}
                  className="h-[50px] mt-2"
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <div />
        <Button
          className="bg-green-600 hover:bg-green-700 min-h-[50px] text-lg"
          onClick={() => (context.current.submitter = "next")}
        >
          Write For Me
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
