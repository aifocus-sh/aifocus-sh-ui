import Link from "next/link";
import { Tally4Icon } from "./icons";

export default function Broadcast() {
  function formatNumber(num: number): string {
    return num.toLocaleString("de-DE");
  }

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="bg-[#4d695e] p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <Tally4Icon className="w-8 h-8" />
          <span className="text-3xl font-bold">{formatNumber(1123987)}</span>
        </div>
      </div>
      <div className="bg-pink-500 p-6 rounded-lg h-full">
        <div className="flex items-center justify-between">
          <span className="text-sm bg-white text-black px-2 py-1 rounded-full">
            Lo mas reciente
          </span>
        </div>
        <h3 className="text-2xl font-bold mt-4">
          Can AI really be protected from text-based attacks?
        </h3>
      </div>
    </div>
  );
}
