import Link from "next/link";
import { Button } from "@nextui-org/react";
import { usePreference } from "@/store/account";
import { StorePopulated } from "@/lib/types/store/store";
import { ProductPopulated } from "@/lib/types/store/product";
import { GroupedCategory } from "./StoreProductList";

const StoreCategory = ({ store }: { store: StorePopulated }) => {
  const { palette } = usePreference();

  const group_products = (products: ProductPopulated[]): GroupedCategory[] => {
    const category_map: { [key: string]: GroupedCategory } = {};

    products.forEach((product) => {
      product.category.forEach((category) => {
        if (!category_map[category._id]) {
          category_map[category._id] = {
            _id: category._id,
            name: category.name,
            products: [],
          };
        }
        category_map[category._id].products.push(product);
      });
    });

    return Object.values(category_map);
  };

  const groups = group_products(store.products);

  return (
    <div className="flex px-4 sm:px-8 items-center justify-center w-full py-6 sm:py-12">
      <div className="flex flex-col gap-2 w-full max-w-screen-lg">
        <p className="text-4xl font-bold px-1 mb-3">Menu</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 items-center justify-between max-w-screen-lg w-full">
          {groups.map((item, idx) => {
            return (
              <Button
                key={idx}
                as={Link}
                href={`#${item.name}`}
                style={{ background: palette.primary }}
                className="rounded-2xl border-none w-full h-20 text-base text-white"
              >
                <span className="font-semibold">{item.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreCategory;
