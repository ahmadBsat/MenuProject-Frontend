import { Button } from "@nextui-org/react";
import Link from "next/link";

const StoreCategory = () => {
  const data = ["Combos", "Sandwiches", "Dips", "Beverage", "Appetizers"];

  return (
    <div className="flex px-4 sm:px-8 items-center justify-center w-full py-6 sm:py-12">
      <div className="flex flex-col gap-2 w-full max-w-screen-lg">
        <p className="text-4xl font-bold px-1 mb-1">Menu</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 items-center justify-between max-w-screen-lg w-full">
          {data.map((item, idx) => {
            return (
              <Button
                key={idx}
                as={Link}
                href={`#${item}`}
                className="bg-primary rounded-2xl border-none w-full h-20 text-base text-white"
              >
                <span className="font-semibold">{item}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreCategory;
