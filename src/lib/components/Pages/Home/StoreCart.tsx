/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge, Button, useDisclosure } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from "../../Common/drawer";
import { useCart } from "@/lib/context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePreference } from "@/store/account";
import { format_pricing } from "@/utils/common";
import StoreCheckout from "./StoreCheckout";
import { StorePopulated } from "@/lib/types/store/store";

const StoreCart = ({ store }: { store: StorePopulated }) => {
  const { currency } = usePreference();
  const { cart, setCartOpen, cartOpen } = useCart();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const currencies = { USD: "$", LBP: "LBP" };

  return (
    <>
      <Drawer open={cartOpen} onOpenChange={setCartOpen}>
        <DrawerTrigger asChild>
          <Badge
            content={cart.count}
            shape="circle"
            size="lg"
            className={"cursor-pointer"}
            classNames={{
              badge: "bg-white text-black max-sm:text-xs",
            }}
          >
            <Button
              size="sm"
              radius="full"
              endContent={<ChevronRight size={16} />}
              onClick={() => setCartOpen(!cartOpen)}
            >
              <ShoppingCartIcon className="size-5" />
            </Button>
          </Badge>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-2xl">
            <DrawerHeader>
              <DrawerTitle>Your Cart</DrawerTitle>
            </DrawerHeader>

            <div className="p-4 pb-8 flex flex-col gap-6">
              {cart.products.map((product, idx) => {
                return (
                  <div key={idx} className="flex gap-4 w-full items-center">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="rounded-lg w-20 h-20 min-w-20 min-h-20 object-cover"
                    />

                    <div className="flex flex-col gap-2 w-full">
                      <p className="text-lg font-bold">{product.name}</p>
                      <div className="flex flex-col">
                        {product.additions.map((group, index) => {
                          return (
                            <div
                              key={`g${index}`}
                              className="flex flex-row gap-1 text-sm text-default-400"
                            >
                              <span className="text-black font-medium">
                                {group.name}
                              </span>

                              {group.items.map((item) => item.name).join(", ")}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-2">
                        <p>
                          <strong>QTY</strong> {product.quantity}
                        </p>

                        <p className="font-medium text-base">
                          <strong> {currencies[currency]}</strong>{" "}
                          {currency === "USD"
                            ? product.price.toFixed(2)
                            : format_pricing(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 pb-8 flex w-full items-center justify-between border-t border-dashed gap-6 text-lg font-semibold">
              <p>Subtotal</p>
              <p>
                <strong> {currencies[currency]}</strong>{" "}
                {currency === "USD"
                  ? cart.total_price.toFixed(2)
                  : format_pricing(cart.total_price)}
              </p>
            </div>

            <DrawerFooter className="flex flex-row justify-end items-center">
              <DrawerClose asChild>
                <Button color="danger">Close</Button>
              </DrawerClose>
              {cart.count !== 0 && (
                <Button
                  onClick={() => {
                    onOpen();
                    setCartOpen(false);
                  }}
                  color="success"
                >
                  Confirm
                </Button>
              )}
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <StoreCheckout
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        store={store._id}
      />
    </>
  );
};

export default StoreCart;
