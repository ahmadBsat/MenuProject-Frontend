/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCart } from "@/lib/context/CartContext";
import { StorePopulated } from "@/lib/types/store/store";
import { usePreference } from "@/store/account";
import { format_pricing } from "@/utils/common";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Badge, Button, Textarea, useDisclosure } from "@nextui-org/react";
import { ChevronRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../Common/drawer";
import StoreCheckout from "./StoreCheckout";
import { useState } from "react";

const CartItem = ({ product, additions, store, index }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [instructions, setInstructions] = useState(product.instructions || "");

  const { currency } = usePreference();
  const { addToCart, removeFromCart, updateCart } = useCart();

  const currencies = { USD: "$", LBP: "LBP" };

  const handleSubmit = async (index: number) => {
    try {
      setLoading(true);
      await updateCart({ store, index, instructions });
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 w-full items-center">
      {product.images.length > 0 && (
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg w-20 h-20 min-w-20 min-h-20 object-cover"
        />
      )}

      <div className="flex flex-col gap-2 w-full">
        <p className="text-lg font-bold">{product.name}</p>
        <div className="flex flex-col">
          {product.additions.map((group, index) => {
            return (
              <div
                key={`g${index}`}
                className="flex flex-row gap-1 text-sm text-default-400"
              >
                <span className="text-black font-medium">{group.name}</span>

                {group.items.map((item) => item.name).join(", ")}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <p>
            <strong>QTY</strong> {product.quantity}
          </p>

          {store?.settings?.display_pricing && (
            <p className="font-medium text-base">
              <strong> {currencies[currency.name]}</strong>{" "}
              {currency.name === "USD"
                ? product.price.toFixed(2)
                : format_pricing(product.price * currency.rate_change)}
            </p>
          )}
        </div>

        {product.instructions && (
          <p className="text-sm">
            <b>Instructions:</b> {product.instructions}
          </p>
        )}

        <div className="flex w-full justify-between">
          <div>
            <Button
              size="sm"
              color="primary"
              className="text-xs text-primary bg-transparent px-2"
              isDisabled={open}
              onClick={() => setOpen(true)}
            >
              {product.instructions ? "Edit" : "Add"} instructions
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="sm"
              isIconOnly
              color="primary"
              variant="ghost"
              onClick={() => {
                removeFromCart(product._id, store._id, additions);
              }}
            >
              <Minus />
            </Button>

            <p className="text-base font-bold">{product.quantity}</p>

            <Button
              size="sm"
              isIconOnly
              color="primary"
              variant="ghost"
              onClick={() => {
                addToCart({
                  store: store._id,
                  product_id: product._id,
                  quantity: 1,
                  product_additions: additions,
                });
              }}
            >
              <Plus />
            </Button>
          </div>
        </div>

        {open && (
          <div className="flex w-full flex-col gap-2">
            <Textarea
              placeholder="Instructions"
              aria-label="Instructions"
              value={instructions}
              onValueChange={(v) => setInstructions(v)}
            />
            <div className="flex justify-end">
              <Button
                color="success"
                variant="ghost"
                size="sm"
                className="text-xs"
                isLoading={loading}
                onClick={() => handleSubmit(index)}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StoreCart = ({ store }: { store: StorePopulated }) => {
  const { currency } = usePreference();
  const { cart, setCartOpen, cartOpen, resetCart } = useCart();
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
              className="max-sm:px-1"
              endContent={<ChevronRight size={16} />}
              onClick={() => setCartOpen(!cartOpen)}
            >
              <ShoppingCartIcon className="size-4 sm:size-5" />
            </Button>
          </Badge>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-2xl overflow-auto">
            <DrawerHeader className="flex justify-between items-center">
              <DrawerTitle>Your Cart</DrawerTitle>
              <Button
                color="primary"
                // isIconOnly
                onClick={async () => {
                  await resetCart({ store: store._id });
                }}
              >
                Clear Cart
              </Button>
            </DrawerHeader>

            <div className="p-4 pb-8 flex flex-col gap-6 max-h-[60vh] overflow-auto">
              {cart.products.map((product, idx) => {
                const additions = product.additions
                  .map((a) => a.items.map((i) => i._id))
                  .flat();

                return (
                  <CartItem
                    key={idx}
                    additions={additions}
                    store={store}
                    product={product}
                    index={idx}
                  />
                );
              })}
            </div>
            {store.settings?.display_pricing && (
              <div className="p-4 pb-4 border-t border-dashed gap-6 font-semibold">
                {store.vat_exclusive ? (
                  <>
                    <div className="flex w-full items-center justify-between text-base">
                      <p>Subtotal</p>
                      <p>
                        <strong>{currencies[currency.name]}</strong>{" "}
                        {currency.name === "USD"
                          ? cart.total_price.toFixed(2)
                          : format_pricing(
                              cart.total_price * currency.rate_change
                            )}
                      </p>
                    </div>

                    <div className="flex w-full items-center justify-between text-base">
                      <p>VAT ({store.vat_percentage}%)</p>
                      <p>
                        <strong>{currencies[currency.name]}</strong>{" "}
                        {currency.name === "USD"
                          ? (
                              (cart.total_price * store.vat_percentage) /
                              100
                            ).toFixed(2)
                          : format_pricing(
                              (cart.total_price *
                                currency.rate_change *
                                store.vat_percentage) /
                                100
                            )}
                      </p>
                    </div>

                    <div className="flex w-full items-center justify-between text-lg">
                      <p>Total (incl. VAT)</p>
                      <p>
                        <strong>{currencies[currency.name]}</strong>{" "}
                        {currency.name === "USD"
                          ? (
                              cart.total_price *
                              (1 + store.vat_percentage / 100)
                            ).toFixed(2)
                          : format_pricing(
                              cart.total_price *
                                currency.rate_change *
                                (1 + store.vat_percentage / 100)
                            )}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex w-full items-center justify-between text-lg">
                    <p>
                      Total
                      <p className="text-sm font-light text-gray-400">(VAT included)</p>
                    </p>

                    <p>
                      <strong>{currencies[currency.name]}</strong>{" "}
                      {currency.name === "USD"
                        ? cart.total_price.toFixed(2)
                        : format_pricing(
                            cart.total_price * currency.rate_change
                          )}
                    </p>
                  </div>
                )}
              </div>
            )}

            <DrawerFooter className="flex flex-row justify-end items-center">
              <DrawerClose asChild>
                <Button color="primary">Close</Button>
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
        store={store}
      />
    </>
  );
};

export default StoreCart;
