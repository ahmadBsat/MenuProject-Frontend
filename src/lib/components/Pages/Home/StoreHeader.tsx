"use client";

import dynamic from "next/dynamic";
import StoreBranches from "./StoreBranch";

const StoreCurrency = dynamic(() => import("./StoreCurrency"), {
  ssr: false,
});

const StoreHeader = () => {
  return (
    <div className="flex items-center justify-center w-full h-14 border-b">
      <div className="flex items-center justify-between max-w-screen-lg w-full">
        <div>
          <StoreBranches />
        </div>
        <div>
          <StoreCurrency />
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
