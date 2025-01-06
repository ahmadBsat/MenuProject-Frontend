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
    <div className="min-h-14 z-50">
      <div
        className="flex fixed top-0 left-0 items-center justify-center w-full min-h-14 max-h-32 border-b"
        style={{
          background:
            store.palette.header_background || store.palette.background,
          color: `${
            store.palette.header_text_color || store.palette.color
          } !important`,
        }}
      >
        <div className="flex items-center justify-between max-w-screen-lg px-8 w-full">
          <div className="w-40">
            <StoreBranches data={store.branches} />
          </div>

          <div className="flex items-center gap-2 justify-center">
            <StoreCurrency currencies={store.currencies} />
            <StoreCart store={store} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
