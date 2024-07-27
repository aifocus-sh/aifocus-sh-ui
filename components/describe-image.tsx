import { CONFIG } from "@/lib/config";

export function DescribeImageExample() {
  return (
    <div
      className="relative w-full rounded-lg bg-card md:mx-0 flex gap-2 p-4"
      id="blur-card"
    >
      <img
        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
        src={`https://st3.depositphotos.com/4741067/13052/i/450/depositphotos_130526846-stock-photo-head-of-multi-colored-zebra.jpg`}
        alt="example image extreme ironing"
      />
      <img
        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
        src={`https://www.planradar.com/wp-content/uploads/2020/02/Dog-Bark-Park.jpg`}
        alt="example image extreme ironing"
      />
      <img
        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
        src={`https://st2.depositphotos.com/6899104/9725/i/450/depositphotos_97258304-stock-photo-two-chicks-one-crazy.jpg`}
        alt="example image extreme ironing"
      />
      <img
        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
        src={`https://i.etsystatic.com/11296903/r/il/130bac/859905332/il_570xN.859905332_8hvq.jpg`}
        alt="example image extreme ironing"
      />
    </div>
  );
}
