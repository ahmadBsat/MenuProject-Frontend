"use client";

import { ProductPopulated } from "@/lib/types/store/product";
import { usePreference } from "@/store/account";
import { Image } from "@nextui-org/react";
import ProductCart from "./ProductCart";
import { format_pricing } from "@/utils/common";
import { StorePopulated } from "@/lib/types/store/store";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerHeader,
} from "../../../Common/drawer";
import { useState } from "react";

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

  const [open, setOpen] = useState(false);
  const currencies = { USD: "$", LBP: "LBP" };

  return (
    // onOpenChange is a currently a condition that is always true just incase there was a setting needed, it will be easier to modify onOpenChange={true ? setOpen : () => {}}
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="flex flex-col gap-1 w-full py-4">
        <div className="flex items-center justify-between w-full">
          <DrawerTrigger>
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
              ) : store.logoDefault ? (
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
              ) : null}
              <div className="font-medium text-left">
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-xs">{category}</p>

                {store.settings?.display_pricing === false ? (
                  <p></p>
                ) : (
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
                )}
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-2xl max-h-[60vh] overflow-auto pb-5">
              <DrawerHeader>
                <DrawerTitle>
                  <div className="lg:flex gap-2 text-sm">
                    {product.images.length > 0 && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        className="max-w-36 max-h-36 min-w-36 min-h-36 w-full h-full aspect-square border-1"
                        style={{
                          borderColor: palette.border || palette.background,
                        }}
                      />
                    )}
                    <div className="text-left">
                      <div className="text-2xl">{product.name}</div>

                      <div>
                        {store.settings?.display_pricing === false ? (
                          <p></p>
                        ) : (
                          <p className="mt-4 text-sm">
                            {currencies[currency.name]}{" "}
                            {currency.name === "USD"
                              ? (product.price * currency.rate_change).toFixed(
                                  2
                                )
                              : format_pricing(
                                  product.price * currency.rate_change
                                )}
                          </p>
                        )}
                      </div>

                      <div className="font-normal text-zinc-500 mt-5">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </DrawerTitle>
                {product.extra_information && (
                  <DrawerDescription className="flex flex-col gap-1 h-full text-left font-normal">
                    <label className="mt-5 font-bold pb-2">
                      Extra Information
                    </label>
                    <div>{product.extra_information}</div>
                  </DrawerDescription>
                )}
              </DrawerHeader>
            </div>
          </DrawerContent>
          <ProductCart product={product} store_info={store} />
        </div>

        <p className="text-sm font-medium mt-2 line-clamp-1">
          {product.description}
        </p>
      </div>
    </Drawer>
  );
};

export default ProductCard;
