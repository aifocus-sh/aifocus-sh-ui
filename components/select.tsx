import { LibraryChartsValue } from "@/components/chart-view/library-charts";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";

interface SelectProps {
  label?: string;
  value: any;
  options: any[];
  onChange: (value: any) => void;
}

export function CustomSelect({ label, value, onChange, options }: SelectProps) {
  return (
    <div className="space-y-2 mb-2">
      {label && (
        <Label htmlFor="select" className="font-medium">
          <h2 className="text-xl font-bold mt-8 md:mt-0 flex items-center gap-2">
            {label}
          </h2>
        </Label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id="article-to-x-text-area"
          className="bg-black text-white border border-input hover:bg-gray-800"
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent className="bg-background text-foreground border border-input">
          {options?.map((option, i) => (
            <SelectItem key={`option-${i}`} value={option?.value || option}>
              {option?.image && (
                <Image
                  src={option.image}
                  alt={option.label}
                  className="h-6 w-10"
                />
              )}
              {option?.label || option}{" "}
              {option?.warning && <p className="font-bold">({option.warning})</p>}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
