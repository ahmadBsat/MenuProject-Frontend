/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
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
import { Product } from "@/lib/types/store/product";
import { useState } from "react";

const ProductCart = ({ product }: { product: Product }) => {
  const { name, description, additions } = product;
  const [selected, setSelected] = useState<Record<string, string[]>>({});

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

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button isIconOnly className="bg-primary">
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
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          <div className="py-8 px-4 flex flex-col gap-2">
            {additions.map((group) => {
              const { is_multiple, group: _id } = group;

              return (
                <div key={group.name}>
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

          <DrawerFooter className="flex flex-row justify-end items-center">
            <DrawerClose asChild>
              <Button color="danger">Cancel</Button>
            </DrawerClose>
            <Button color="success">Confirm</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductCart;
