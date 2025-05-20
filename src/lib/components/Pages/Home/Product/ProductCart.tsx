/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Checkbox, CheckboxGroup, Divider } from "@nextui-org/react";
import { CheckIcon, ShoppingCartIcon } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from "../../../Common/drawer";
import { ProductPopulated } from "@/lib/types/store/product";
import { useState } from "react";
import { usePreference } from "@/store/account";
import { useCart } from "@/lib/context/CartContext";
import { format_pricing } from "@/utils/common";
import { StorePopulated } from "@/lib/types/store/store";

const ProductCart = ({
  product,
  store_info,
}: {
  product: ProductPopulated;
  store_info: StorePopulated;
}) => {
  const { palette, store } = usePreference();
  const { name, description, additions } = product;
  const { addToCart } = useCart();
  const { currency } = usePreference();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [justAdded, setJustAdded] = useState(false); // state to control icon

  const flattened_values = Object.values(selected).flat();
  const currencies = { USD: "$", LBP: "LBP" };
  const handle_change = (
    group_id: string,
    is_multiple: boolean,
    new_value: string[]
  ) => {
    setSelected((prev) => {
      const updated_group_values = is_multiple
        ? new_value // Allow multiple selections
        : [new_value[new_value.length - 1]]; // Only allow the last selection

      return {
        ...prev,
        [group_id]: updated_group_values, // Update the specific group values
      };
    });
  };

  const selectedItemsPrice = product.additions
    .flatMap(
      (addition) =>
        selected[addition.group]?.flatMap((selectedItemId) =>
          addition.items
            .filter((item) => item._id === selectedItemId)
            .map((item) =>
              currency.name === "USD"
                ? item.additional_price
                : item.additional_price * currency.rate_change
            )
        ) || []
    )
    .reduce((sum, price) => sum + price, 0); // Sum all prices

  const currentSubTotal =
    product.price * currency.rate_change + selectedItemsPrice;

  return additions.length > 0 ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          isIconOnly
          style={{ background: palette.primary }}
          onClick={() => setOpen(true)}
        >
          <ShoppingCartIcon
            size={20}
            className="stroke-white font-bold size-5"
          />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl max-h-[60vh] overflow-auto">
          <DrawerHeader>
            <DrawerTitle>{name}</DrawerTitle>
            <DrawerDescription className="flex flex-col gap-1">
              <span className="max-md:text-left">{description}</span>
            </DrawerDescription>
          </DrawerHeader>

          <div className="py-8 px-4 flex flex-col gap-2">
            {additions.map((group, idx) => {
              const { is_multiple, group: _id } = group;

              return (
                <div key={idx}>
                  <div className="">
                    <CheckboxGroup
                      label={group.name}
                      value={selected[_id] || []}
                      onValueChange={(v) => handle_change(_id, is_multiple, v)}
                    >
                      {group.items.map((item) => {
                        return (
                          <Checkbox key={item._id} value={item._id}>
                            {item.name}
                          </Checkbox>
                        );
                      })}
                    </CheckboxGroup>
                  </div>
                </div>
              );
            })}
          </div>

          {store_info.settings?.display_pricing && (
            <div className="p-5 flex justify-between">
              <span className="font-bold">Subtotal</span>

              <span>
                <strong> {currencies[currency.name]}</strong>{" "}
                {currency.name === "USD"
                  ? currentSubTotal.toFixed(2)
                  : format_pricing(currentSubTotal)}
              </span>
            </div>
          )}
          <Divider />

          <DrawerFooter className="flex flex-row justify-end items-center">
            <DrawerClose asChild>
              <Button color="primary">Cancel</Button>
            </DrawerClose>
            <Button
              color="success"
              onClick={() => {
                setOpen(false);
                addToCart({
                  product_id: product._id,
                  product_additions:
                    Object.values(selected).length > 0 ? flattened_values : [],
                  quantity: 1,
                  store: store,
                });
                setSelected({});
              }}
            >
              Confirm
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Button
      isIconOnly
      style={{ background: palette.primary }}
      onPress={() => {
        setOpen(false);
        addToCart({
          product_id: product._id,
          product_additions: [],
          quantity: 1,
          store: store,
        });
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1000); // reset icon after 1 second
      }}
    >
      {justAdded ? (
        <CheckIcon size={20} className="stroke-white font-bold size-5 " />
      ) : (
        <ShoppingCartIcon size={20} className="stroke-white font-bold size-5" />
      )}
    </Button>
  );
};

export default ProductCart;
