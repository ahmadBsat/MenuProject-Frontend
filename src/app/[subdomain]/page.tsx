/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import StoreCategory from "@/lib/components/Pages/Home/StoreCategory";
import StoreFooter from "@/lib/components/Pages/Home/StoreFooter";
import StoreHeader from "@/lib/components/Pages/Home/StoreHeader";
import StoreProductList from "@/lib/components/Pages/Home/StoreProductList";
import StoreQuickMenu from "@/lib/components/Pages/Home/StoreQuickMenu";
import NotFound from "@/lib/components/Pages/NotFound";
import { API_STORE } from "@/lib/services/store/store_service";
import { StorePopulated } from "@/lib/types/store/store";
import { usePreference } from "@/store/account";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const Page = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [store, setStore] = useState<StorePopulated>({
    _id: "",
    watermark: true,
    logoDefault: true,
    background_image: "",
    branches: [],
    categories: [],
    currencies: [],
    banners: [{ images: [] }],
    logo: "",
    name: "",
    palette: {
      background: "",
      border: "",
      color: "",
      primary: "",
      header_background: "",
      header_text_color: "",
      price_color: "",
      checkout_content: "",
      checkout_background: "",
      category_background: "",
      category_color: "",
    },
    products: [],
    vat_exclusive: false,
    vat_percentage: 0,
  });
  const {
    branch,
    currency,
    has_hydrated,
    setStore: setCurrentStore,
    setPalette,
    setBranch,
    setBanners,
    setCurrency,
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
      setBanners(res.banners.length > 0 ? res.banners[0] : { images: [] });
      if (branch._id) {
        const current_branch = res.branches.find((x) => x._id === branch._id);
        if (current_branch) {
          setBranch(current_branch);
        }
      }

      const current_currency = res.currencies.find(
        (c) => c.name === currency.name
      );

      if (current_currency) {
        setCurrency(current_currency);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branch._id, domain, setPalette]);

  useEffect(() => {
    if (has_hydrated) {
      getStore();
    }
  }, [domain, getStore, branch._id, has_hydrated]);

  if (loading && store?.products.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <BounceLoader color="#a41f13" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen max-h-[calc(100vh-50px)] w-full">
        <NotFound show_btn={false} />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          background: store.palette.background,
          color: store.palette.color,
        }}
        className="w-full min-h-screen h-screen flex flex-col overflow-y-auto"
      >
        <StoreHeader store={store} />

        <StoreCategory store={store} />

        <div className="sticky top-0 z-10 bg-inherit pb-8 pt-16 flex w-full justify-center items-center px-4 sm:px-8 flex-col">
          <StoreQuickMenu store={store} />
        </div>

        <div className="flex-grow z-0">
          <StoreProductList store={store} />
        </div>

        <div className="mt-auto">
          <StoreFooter store={store} />
        </div>
      </div>
    </>
  );
};

export default Page;
