/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getUrl, URLs } from "@/lib/constants/urls";
import { useCart } from "@/lib/context/CartContext";
import { StorePopulated } from "@/lib/types/store/store";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Badge, Button, } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
const StoreCart = ({ store }: { store: StorePopulated }) => {
  const { cart, setCartOpen, cartOpen } = useCart();
  const origin = window.location.origin;
  const storeLink =
    store?.custom_domain?.length > 0
      ? store.custom_domain
      : origin + "/" + store.domain;

  return (
    <>
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
          as={Link}
          href={storeLink + getUrl(URLs.cart)}
          size="sm"
          radius="full"
          className="max-sm:px-1"
          endContent={<ChevronRight size={16} />}
          onClick={() => setCartOpen(!cartOpen)}
        >
          <ShoppingCartIcon className="size-4 sm:size-5" />
        </Button>
      </Badge>
    </>
  );
};

export default StoreCart;
