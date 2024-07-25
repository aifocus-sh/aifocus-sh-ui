import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronDownIcon } from "./icons";

interface Props {
  parameters: {
    temperature: number;
    topP: number;
    maxTokens: number;
  }
  setParameters: (parameters: Props["parameters"]) => void
}

export function CustomParameters({ parameters, setParameters }: Props) {

  return (
    <Accordion
      type="single"
      id="blur-card"
      collapsible
      className="w-full max-w-md mt-8 rounded-lg"
    >
      <AccordionItem value="form-settings">
        <AccordionTrigger className="flex items-center justify-between p-4 ">
          <span>Parameters</span>
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 data-[state=open]:rotate-180" />
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <div className="flex align-center justify-between">
                <Label htmlFor="font-size">Temperature</Label>
                <p className="text-sm text-gray-200">{parameters.temperature}</p>
              </div>
              <Slider
                id="font-size"
                value={[parameters.temperature]}
                onValueChange={(v) => setParameters({ ...parameters, temperature: v[0] })}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex align-center justify-between">
                <Label htmlFor="font-size">Top P</Label>
                <p className="text-sm text-gray-200">{parameters.topP}</p>
              </div>
              <Slider
                id="line-height"
                value={[parameters.topP]}
                onValueChange={(v) => setParameters({ ...parameters, topP: v[0] })}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex align-center justify-between">
                <Label htmlFor="font-size">Max output tokens</Label>
                <p className="text-sm text-gray-200">{parameters.maxTokens}</p>
              </div>
              <Slider
                id="spacing"
                value={[parameters.maxTokens]}
                onValueChange={(v) => setParameters({ ...parameters, maxTokens: v[0] })}
                min={64}
                max={1024}
                step={64}
                className="w-full"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
