"use client";

import dynamic from "next/dynamic";
import StoreBranches from "./StoreBranch";
import { StorePopulated } from "@/lib/types/store/store";
import StoreCart from "./StoreCart";

const StoreCurrency = dynamic(() => import("./StoreCurrency"), {
  ssr: false,
});

const StoreHeader = ({ store }: { store: StorePopulated }) => {
  return (
    <div className="flex items-center justify-center w-full h-14 border-b">
      <div className="flex items-center justify-between max-w-screen-lg px-8 w-full">
        <div>
          <StoreBranches data={store.branches} />
        </div>
        <div className="flex items-center gap-2 justify-center">
          <StoreCurrency currencies={store.currencies} />
          <StoreCart />
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
