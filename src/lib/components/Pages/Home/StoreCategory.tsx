import { StorePopulated } from "@/lib/types/store/store";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { FreeMode } from "swiper";

const StoreCategory = ({ store }: { store: StorePopulated }) => {
  const breakpoints = {
    320: { slidesPerView: 1.5, spaceBetween: 10 },
    480: { slidesPerView: 2, spaceBetween: 15 },
    768: { slidesPerView: 2.5, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 },
  };

  const processBanners = (
    breakpoints: Record<number, { slidesPerView: number }>
  ) => {
    const max = Math.max(
      ...Object.values(breakpoints).map((bp) => bp.slidesPerView)
    );

    const min = max * 2;
    let banners = [...store.banners];

    if (banners.length > 2 && banners.length < min) {
      banners = [...banners, ...store.banners];
    }

    return banners;
  };

  const banners = processBanners(breakpoints);

  return (
    <div className="flex px-4 sm:px-8 items-center justify-center w-full py-6 sm:py-12">
      <div className="flex flex-col gap-2 w-full max-w-screen-lg">
        {/* Store Logo */}
        {store.logo && (
          <div className="rounded-lg flex items-center w-full justify-center z-20">
            <Image
              src={store.logo}
              alt={store.name}
              width={200}
              height={200}
              className="max-h-48 object-cover rounded-2xl"
            />
          </div>
        )}

        {/* Swiper for Banners */}
        {banners.length > 0 && (
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
                    className="w-[350px] h-[190px] rounded-2xl object-cover select-none"
                    width={350}
                    height={190}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <p className="text-4xl font-bold px-1 -mb-16 sm:-mb-24 z-30">
          {store.store_label ? store.store_label : "Menu"}
        </p>
      </div>
    </div>
  );
};

export default StoreCategory;
