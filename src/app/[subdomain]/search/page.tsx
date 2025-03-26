"use client";

import StoreAccessLinks from "@/lib/components/Pages/Home/StoreAccessLinks";
import StoreFooter from "@/lib/components/Pages/Home/StoreFooter";
import StoreHeader from "@/lib/components/Pages/Home/StoreHeader";
import { useStore } from "@/lib/context/StoreContext";
import SearchInput from "./components/SearchInput";
import StoreProductList from "@/lib/components/Pages/Home/StoreProductList";

const Page = () => {
  const { store } = useStore();

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        background: store.palette.background,
        color: store.palette.color,
      }}
      className="w-full min-h-screen h-screen flex flex-col overflow-y-auto"
    >
      <StoreHeader store={store} />
      <div className="container mx-auto p-4 flex items-center justify-center">
        <SearchInput store={store} />
      </div>

      <div className="flex-grow z-0">
        <StoreProductList store={store} />
      </div>

      <div className="mt-auto">
        <StoreFooter store={store} />
      </div>

      <StoreAccessLinks store={store} />
    </div>
  );
};

export default Page;
