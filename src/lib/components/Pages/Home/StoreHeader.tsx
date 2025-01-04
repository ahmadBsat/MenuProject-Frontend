"use client";

import dynamic from "next/dynamic";
import StoreBranches from "./StoreBranch";
import { StorePopulated } from "@/lib/types/store/store";
import StoreCart from "./StoreCart";
import Image from "next/image";

const StoreCurrency = dynamic(() => import("./StoreCurrency"), {
  ssr: false,
});

const StoreHeader = ({ store }: { store: StorePopulated }) => {
  return (
    <div className="flex items-center justify-center w-full min-h-14 max-h-32 border-b">
      <div className="flex items-center justify-between max-w-screen-lg px-8 w-full">
        <div className="w-40">
          <StoreBranches data={store.branches} />
        </div>
        {store.logo && (
          <div className="rounded-lg lg:flex hidden">
            <Image
              src={store.logo}
              alt={store.name}
              width={200}
              height={200}
              className="max-h-32 p-3 object-cover rounded-2xl"
            />
          </div>
        )}

        <div className="flex items-center gap-2 justify-center">
          <StoreCurrency currencies={store.currencies} />
          <StoreCart store={store} />
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
