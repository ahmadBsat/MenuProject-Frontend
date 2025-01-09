/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Checkbox, CheckboxGroup, Divider } from "@nextui-org/react";
import { ShoppingCartIcon } from "lucide-react";
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

const ProductCart = ({ product }: { product: ProductPopulated }) => {
  const { palette, store } = usePreference();
  const { name, description, additions } = product;
  const { addToCart } = useCart();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const flattened_values = Object.values(selected).flat();

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
    .flatMap((addition) =>
      addition.items
        .filter((item) => flattened_values.includes(item._id))
        .map((item) => item.additional_price)
    )
    .reduce((sum, price) => sum + price, 0);

  const currentSubTotal = product.price + selectedItemsPrice;

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
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>{name}</DrawerTitle>
            <DrawerDescription className="flex flex-col gap-1">
              <p>{description}</p>
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

          <div className="p-5 flex justify-between">
            {" "}
            <span className="font-bold">Subtotal</span>
            <span> {currentSubTotal}$</span>
          </div>
          <Divider />

          <DrawerFooter className="flex flex-row justify-end items-center">
            <DrawerClose asChild>
              <Button color="danger">Cancel</Button>
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
                setSelected({})
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
      }}
    >
      <ShoppingCartIcon size={20} className="stroke-white font-bold size-5" />
    </Button>
  );
};

export default ProductCart;
