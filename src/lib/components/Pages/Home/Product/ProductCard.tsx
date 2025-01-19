"use client";

import { ProductPopulated } from "@/lib/types/store/product";
import { usePreference } from "@/store/account";
import { Image } from "@nextui-org/react";
import ProductCart from "./ProductCart";
import { format_pricing } from "@/utils/common";
import { StorePopulated } from "@/lib/types/store/store";

const ProductCard = ({
  product,
  category,
  store,
}: {
  product: ProductPopulated;
  category: string;
  store: StorePopulated;
}) => {
  const { currency, palette } = usePreference();

  const currencies = { USD: "$", LBP: "LBP" };

  return (
    <div className="flex flex-col gap-1 w-full py-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-3">
          {product.images.length > 0 ? (
            <div className="max-w-24 max-h-24 w-full h-full aspect-square">
              <Image
                src={product.images[0]}
                alt={product.name}
                className="max-w-24 max-h-24 min-w-24 min-h-24 w-full h-full aspect-square border-1"
                style={{
                  borderColor: palette.border || palette.background,
                }}
              />
            </div>
          ) : (
            <div className="max-w-24 max-h-24 w-full h-full aspect-square">
              <Image
                src={store.logo}
                alt={product.name}
                className="max-w-24 max-h-24 min-w-24 min-h-24 w-full h-full aspect-square border-1"
                style={{
                  borderColor: palette.border || palette.background,
                }}
              />
            </div>
          )}
          <div className="font-medium">
            <p className="font-semibold text-lg">{product.name}</p>
            <p className="text-xs">{category}</p>
            <p
              className="mt-4 text-base font-semibold"
              style={{
                color: store.palette.price_color || store.palette.color,
              }}
            >
              {currencies[currency.name]}{" "}
              {currency.name === "USD"
                ? (product.price * currency.rate_change).toFixed(2)
                : format_pricing(product.price * currency.rate_change)}
            </p>
          </div>
        </div>

        <ProductCart product={product} />
      </div>

      <p className="text-sm font-medium mt-2">{product.description}</p>
    </div>
  );
};

export default ProductCard;
