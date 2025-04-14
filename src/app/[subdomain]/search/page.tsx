"use client";

import StoreAccessLinks from "@/lib/components/Pages/Home/StoreAccessLinks";
import StoreFooter from "@/lib/components/Pages/Home/StoreFooter";
import StoreHeader from "@/lib/components/Pages/Home/StoreHeader";
import { useStore } from "@/lib/context/StoreContext";
import SearchInput from "./components/SearchInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUrl, URLs } from "@/lib/constants/urls";
import SearchProductList from "./components/SearchProductsList";

const Page = () => {
  const { store } = useStore();
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!store) {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(getUrl(URLs.search), "");
      router.push(newPath);
    }
  }, [store, router]);

  if (!store) {
    return null;
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
        <SearchInput store={store} setValue={setValue} value={value} />
      </div>

      <div className="flex-grow z-0">
        <SearchProductList store={store} value={value} />
      </div>

      <div className="mt-auto">
        <StoreFooter store={store} />
      </div>

      <StoreAccessLinks store={store} />
    </div>
  );
};

export default Page;
