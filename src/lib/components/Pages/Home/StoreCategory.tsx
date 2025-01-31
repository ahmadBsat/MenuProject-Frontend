import Link from "next/link";
import { Button } from "@nextui-org/react";
import { usePreference } from "@/store/account";
import { StorePopulated } from "@/lib/types/store/store";
import { ProductPopulated } from "@/lib/types/store/product";
import { GroupedCategory } from "./StoreProductList";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { FreeMode, Navigation, Pagination } from "swiper";

// Define Swiper breakpoints dynamically
const breakpoints = {
  320: { slidesPerView: 1.5, spaceBetween: 10 },
  480: { slidesPerView: 2, spaceBetween: 15 },
  768: { slidesPerView: 2.5, spaceBetween: 20 },
  1024: { slidesPerView: 3, spaceBetween: 30 },
};

// Function to get max slides per view dynamically
const getMaxSlidesPerView = (breakpoints: Record<number, { slidesPerView: number }>) => {
  return Math.max(...Object.values(breakpoints).map((bp) => bp.slidesPerView));
};

const StoreCategory = ({ store }: { store: StorePopulated }) => {
  const { palette } = usePreference();

  // Function to group products by category
  const groupProducts = (products: ProductPopulated[]): GroupedCategory[] => {
    const categoryMap: Record<string, GroupedCategory> = {};

    products.forEach((product) => {
      product.category.forEach((category) => {
        if (!categoryMap[category._id]) {
          categoryMap[category._id] = {
            _id: category._id,
            name: category.name,
            products: [],
          };
        }
        categoryMap[category._id].products.push(product);
      });
    });

    return Object.values(categoryMap);
  };

  // Get grouped categories
  const groups = groupProducts(store.products);

  // Ensure banners have enough slides for looping
  const maxSlidesPerView = getMaxSlidesPerView(breakpoints);
  const minSlidesNeeded = maxSlidesPerView * 2;
  let banners = [...store.banners];

  while (banners.length < minSlidesNeeded) {
    banners = [...banners, ...store.banners];
  }

  return (
    <div className="flex px-4 sm:px-8 items-center justify-center w-full py-6 sm:py-12">
      <div className="flex flex-col gap-2 w-full max-w-screen-lg">
        {/* Swiper for Banners */}
        <div className="max-w-screen-lg w-full">
          <Swiper
            freeMode={true}
            pagination={false}
            autoplay={false}
            allowTouchMove
            loop={true}
            breakpoints={breakpoints}
            modules={[FreeMode]}
            className="mySwiper"
          >
            {banners.map((item, idx) => (
              <SwiperSlide key={idx} className="rounded-2xl">
                <Image
                  src={item.images[0]}
                  alt={`banner-${idx}`}
                  className="w-[350px] h-[200px] rounded-2xl object-cover"
                  width={350}
                  height={200}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Store Logo */}
        {store.logo && (
          <div className="rounded-lg flex items-center w-full justify-center">
            <Image
              src={store.logo}
              alt={store.name}
              width={200}
              height={200}
              className="max-h-48 object-cover rounded-2xl"
            />
          </div>
        )}

        <p className="text-4xl font-bold px-1 mb-3">Menu</p>

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
              <span className="font-semibold text-wrap text-center">{item.name}</span>
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
                  <span className="font-semibold text-wrap text-center">{item.name}</span>
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default StoreCategory;
