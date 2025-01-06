"use client";

import { ProductPopulated } from "@/lib/types/store/product";
import { usePreference } from "@/store/account";
import { Image } from "@nextui-org/react";
import ProductCart from "./ProductCart";
import { format_pricing } from "@/utils/common";

const ProductCard = ({
  product,
  category,
}: {
  product: ProductPopulated;
  category: string;
}) => {
  const { currency } = usePreference();

  const currencies = { USD: "$", LBP: "LBP" };

  return (
    <div className="flex flex-col gap-1 w-full py-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-3">
          <div className="max-w-24 max-h-24 w-full h-full aspect-square">
            <Image
              src={product.images[0]}
              alt={product.name}
              className="max-w-24 max-h-24 min-w-24 min-h-24 w-full h-full aspect-square"
            />
          </div>
          <div className="font-medium">
            <p className="font-semibold text-lg">{product.name}</p>
            <p>{category}</p>
            <p className="mt-4 text-lg font-semibold">
              {currencies[currency]}{" "}
              {currency === "USD"
                ? product.price.toFixed(2)
                : format_pricing(product.price)}
            </p>
          </div>
        </div>

        <ProductCart product={product} />
      </div>

      <p className="text-base font-medium mt-2">{product.description}</p>
    </div>
  );
};

export default ProductCard;
