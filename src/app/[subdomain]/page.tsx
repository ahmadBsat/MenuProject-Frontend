/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import DotsLoader from "@/lib/components/Loader/DotsLoader";
import StoreCategory from "@/lib/components/Pages/Home/StoreCategory.tsx";
import StoreHeader from "@/lib/components/Pages/Home/StoreHeader";
import StoreProductList from "@/lib/components/Pages/Home/StoreProductList";
import NotFound from "@/lib/components/Pages/NotFound";
import { CartProvider } from "@/lib/context/CartContext";
import { API_STORE } from "@/lib/services/store/store_service";
import { StorePopulated } from "@/lib/types/store/store";
import { usePreference } from "@/store/account";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Page = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [store, setStore] = useState<StorePopulated | null>(null);
  const {
    setPalette,
    branch,
    currency,
    setStore: setCurrentStore,
  } = usePreference();

  const params = useParams();
  const domain = params.subdomain as string;

  const getStore = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      let query;

      if (branch._id) {
        query = `?branch=${branch._id}`;
      }

      const res = await API_STORE.getStoreByDomain(domain, query);
      setStore(res);
      setCurrentStore(res._id);
      setPalette(res.palette);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branch, domain, setPalette, currency]);

  useEffect(() => {
    getStore();
  }, [domain, getStore, branch, currency]);

  if (loading && store?.products.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <DotsLoader />
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="h-screen max-h-[calc(100vh-50px)] w-full">
        <NotFound show_btn={false} />;
      </div>
    );
  }

  return (
    <div
      style={{
        background: store.palette.background,
        color: store.palette.color,
      }}
      className="w-full h-full flex flex-col"
    >
      <CartProvider>
        <StoreHeader store={store} />
        <StoreCategory store={store} />
        <StoreProductList data={store.products} />
      </CartProvider>
    </div>
  );
};

export default Page;
