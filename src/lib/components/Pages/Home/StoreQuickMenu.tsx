"use client";

import { ProductPopulated } from "@/lib/types/store/product";
import { StorePopulated } from "@/lib/types/store/store";
import { Button } from "@nextui-org/react";
import { GroupedCategory } from "./StoreProductList";
import { usePreference } from "@/store/account";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { FreeMode } from "swiper";
import Link from "next/link";

export const group_products = (
  products: ProductPopulated[]
): GroupedCategory[] => {
  const categoryMap: Record<string, GroupedCategory> = {};

  products.forEach((product) => {
    product.category.forEach((category) => {
      if (!categoryMap[category._id]) {
        categoryMap[category._id] = {
          _id: category._id,
          name: category.name,
          order: category.order || 1,
          products: [],
        };
      }

      categoryMap[category._id].products.push(product);
    });
  });

  return Object.values(categoryMap);
};

const StoreQuickMenu = ({ store }: { store: StorePopulated }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { palette } = usePreference();

  const groups = group_products(store.products).sort(
    (a, b) => a.order - b.order
  );

  return (
    <>
      {/* Desktop Category Buttons */}
      <div className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 items-center justify-between max-w-screen-lg w-full">
        {groups.map((item, idx) => (
          <Button
            key={idx}
            as={Link}
            href={`#${item.name}`}
            style={{ background: palette.primary }}
            className="rounded-2xl border-none w-full h-20 text-base text-white"
          >
            <span className="font-semibold text-wrap text-center">
              {item.name}
            </span>
          </Button>
        ))}
      </div>

      {/* Mobile Category Swiper */}
      <div className="max-w-screen-lg w-full sm:hidden">
        <Swiper
          freeMode={true}
          pagination={false}
          autoplay={false}
          allowTouchMove
          breakpoints={{
            310: { slidesPerView: 3.5, spaceBetween: 5 },
          }}
          slidesPerView={3}
          spaceBetween={5}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {groups.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Button
                as={Link}
                href={`#${item.name}`}
                style={{ background: palette.primary }}
                className="rounded-2xl border-none text-center flex items-center justify-center w-full h-20 text-base text-white"
              >
                <span className="font-semibold text-wrap text-center">
                  {item.name}
                </span>
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default StoreQuickMenu;
