/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import DotsLoader from "@/lib/components/Loader/DotsLoader";
import StoreCategory from "@/lib/components/Pages/Home/StoreCategory.tsx";
import StoreHeader from "@/lib/components/Pages/Home/StoreHeader";
import StoreProductList from "@/lib/components/Pages/Home/StoreProductList";
import NotFound from "@/lib/components/Pages/NotFound";
import { API_STORE } from "@/lib/services/store/store_service";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Page = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [store, setStore] = useState<any>(null);

  const params = useParams();
  const domain = params.subdomain as string;

  const getStore = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await API_STORE.getStoreByDomain(domain);
      setStore(res);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [domain]);

  useEffect(() => {
    getStore();
  }, [domain, getStore]);

  if (loading) {
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
    <div className="w-full h-full flex flex-col">
      <StoreHeader />
      <StoreCategory />
      <StoreProductList
        data={[
          {
            _id: "1",
            name: "Combos",
            products: [
              {
                _id: "1",
                name: "Cloud Burger",
                price: 6.5,
                description: "lorem ipsum saftinh san xjj test gss",
                images: [
                  "https://cloudybites.moviyum.com/storage/product/2024-09-05-66d8e79bdb4fd.png",
                ],
                additions: [
                  {
                    name: "test",
                    is_multiple: false,
                    items: [
                      {
                        _id: "1",
                        name: "Mayo",
                        image: "",
                        additional_price: 0,
                      },
                      {
                        _id: "2",
                        name: "Ketchup",
                        image: "",
                        additional_price: 0,
                      },
                    ],
                  },
                ],
              },
              {
                _id: "1",
                name: "Cloud Burger",
                price: 6.5,
                description: "lorem ipsum saftinh san xjj test gss",
                images: [
                  "https://cloudybites.moviyum.com/storage/product/2024-09-05-66d8e79bdb4fd.png",
                ],
                additions: [{ name: "test", is_multiple: true, items: [] }],
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ] as any,
          },
          {
            _id: "1",
            name: "Sandwiches",
            products: [
              {
                _id: "1",
                name: "Cloud Burger",
                price: 6.5,
                description: "lorem ipsum saftinh san xjj test gss",
                images: [
                  "https://cloudybites.moviyum.com/storage/product/2024-09-05-66d8e79bdb4fd.png",
                ],
                additions: [{ name: "test", is_multiple: true, items: [] }],
              },
              {
                _id: "1",
                name: "Cloud Burger",
                price: 6.5,
                description: "lorem ipsum saftinh san xjj test gss",
                images: [
                  "https://cloudybites.moviyum.com/storage/product/2024-09-05-66d8e79bdb4fd.png",
                ],
                additions: [{ name: "testtt", is_multiple: false, items: [] }],
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Page;
