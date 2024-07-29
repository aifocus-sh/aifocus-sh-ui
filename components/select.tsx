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
import { cn } from "@/lib/utils";

interface SelectProps {
  label?: string;
  value: any;
  options: any[];
  placeholder?: string;
  onChange: (value: any) => void;
  className?: string;
}

export function CustomSelect({ label, value, onChange, options, placeholder, className }: SelectProps) {
  return (
    <div className="space-y-2 min-w-[120px]">
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
          className={cn("bg-black text-white border border-input hover:bg-gray-800", className)}
        >
          <SelectValue placeholder={placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent className="bg-background text-foreground border border-input">
          {options?.map((option, i) => (
            <SelectItem key={`option-${i}-${option.value || option}`} value={option?.value || option}>
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
