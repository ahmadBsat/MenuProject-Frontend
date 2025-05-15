"use client";

import StoreHeader from "@/lib/components/Pages/Home/StoreHeader";
import { getUrl, URLs } from "@/lib/constants/urls";
import { useCart } from "@/lib/context/CartContext";
import { useStore } from "@/lib/context/StoreContext";
import { usePreference } from "@/store/account";
import { format_pricing } from "@/utils/common";
import { Button, Textarea } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartItem = ({ product, additions, store, index, open, setOpenIndex }) => {
  const [instructions, setInstructions] = useState(product.instructions || "");

  const { currency } = usePreference();
  const { addToCart, removeFromCart, updateCart } = useCart();

  const currencies = { USD: "$", LBP: "LBP" };

  // Auto-save effect (debounced)
  useEffect(() => {
    if (instructions === product.instructions) return; // Prevent unnecessary API calls

    const delaySave = setTimeout(() => {
      handleSubmit(index, instructions);
    }, 1000); // Adjust delay as needed (1s)

    return () => clearTimeout(delaySave); // Cleanup function on re-typing
  }, [instructions]); // Runs only when `instructions` change

  // Submit function
  const handleSubmit = async (index: number, updatedInstructions: string) => {
    try {
      await updateCart({ store, index, instructions: updatedInstructions });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="flex gap-4 w-full items-center bg-white rounded-lg p-4">
      {product.images.length > 0 && (
        <Image
          src={product.images[0]}
          alt={product.name}
          width={100}
          height={100}
          className="rounded-lg object-cover"
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
              onClick={() => setOpenIndex(open ? null : index)}
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
              onValueChange={setInstructions} // Updates state on change
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const { store } = useStore();
  useEffect(() => {
    if (!store) {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(getUrl(URLs.checkout), "");
      router.push(newPath);
    }
  }, [store, router]);
  const shouldRender = !!store;

  if (!shouldRender) {
    console.log("no store");
    return null;
  }
  const { currency } = usePreference();
  const { cart, resetCart } = useCart();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const origin = window.location.origin;
  const storeLink =
    store.custom_domain.length > 0
      ? store.custom_domain
      : origin + "/" + store.domain;
  const currencies = { USD: "$", LBP: "LBP" };
  return (
    <div
      style={{
        background: store.palette.background,
      }}
      className="w-full min-h-screen h-screen flex flex-col overflow-y-auto "
    >
      <StoreHeader store={store} />
      <div className="container mx-auto flex flex-col gap-4 p-4">
        <div className="flex gap-4 items-center">
          <Button as={Link} href={storeLink} color="success">
            Back
          </Button>
          <div
            className="text-xl font-mono"
            style={{
              color: store.palette.checkout_content,
            }}
          >
            Checkout
          </div>
        </div>

        <div className="flex flex-col gap-6 max-h-[60vh] overflow-auto">
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
                open={openIndex === idx}
                setOpenIndex={setOpenIndex}
              />
            );
          })}
        </div>
        {store.settings?.display_pricing && (
          <div className="border-t border-dashed gap-6 font-semibold">
            {store.vat_exclusive ? (
              <div className="mt-2 bg-white rounded-lg p-4">
                <div className="flex w-full items-center justify-between text-base">
                  <p>Subtotal</p>
                  <p>
                    <strong>{currencies[currency.name]}</strong>{" "}
                    {currency.name === "USD"
                      ? cart.total_price.toFixed(2)
                      : format_pricing(cart.total_price * currency.rate_change)}
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
              </div>
            ) : (
              <div className="mt-2 bg-white rounded-lg p-4 flex w-full items-center justify-between text-lg">
                <p>
                  Total
                  <span className="ml-1 text-sm font-light text-gray-400">
                    (VAT included)
                  </span>
                </p>

                <p>
                  <strong>{currencies[currency.name]}</strong>{" "}
                  {currency.name === "USD"
                    ? cart.total_price.toFixed(2)
                    : format_pricing(cart.total_price * currency.rate_change)}
                </p>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-row justify-end items-center">
          {cart.count !== 0 && (
            <Button
              as={Link}
              href={storeLink + getUrl(URLs.checkout)}
              color="success"
            >
              Checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
