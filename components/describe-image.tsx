import { CONFIG } from "@/lib/config";

export function DescribeImageExample() {
  return (
    <div
      className="relative w-full max-w-md rounded-lg bg-card md:mx-0 flex gap-2 p-4"
      id="blur-card"
    >
      <img
        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
        src={`${CONFIG.examples}/extreme_ironing.jpg`}
        alt="example image extreme ironing"
      />
      <img
        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
        src={`${CONFIG.examples}/waterview.jpg`}
        alt="example image extreme ironing"
      />
      <img
        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
        src={`${CONFIG.examples}/many-colors.jpg`}
        alt="example image extreme ironing"
      />
    </div>
  );
}
