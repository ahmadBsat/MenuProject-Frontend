"use client";

import { useEffect } from "react";
import { ProductPopulated } from "@/lib/types/store/product";
import { StorePopulated } from "@/lib/types/store/store";
import { Button, Divider } from "@nextui-org/react";
import { GroupedCategory } from "./StoreProductList";
import { usePreference } from "@/store/account";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { FreeMode } from "swiper";
import { useWindowSize } from "@uidotdev/usehooks";
import Image from "next/image";

export type GroupedSection = {
  _id: string;
  name: string;
  order: number;
  images: string[];
  categories: GroupedCategory[];
};

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

  return Object.values(categoryMap).sort((a, b) => a.order - b.order);
};

export const group_sections = (
  products: ProductPopulated[]
): GroupedSection[] => {
  const sectionMap: Record<string, GroupedSection> = {};

  products.forEach((product) => {
    product.category.forEach((category) => {
      const sections =
        Array.isArray(category.section) && category.section.length > 0
          ? category.section.filter(
              (
                s
              ): s is {
                _id: string;
                name: string;
                order: number;
                images: string[];
              } => typeof s === "object" && s !== null
            )
          : [{ _id: "no-section", name: "All", order: 999, images: [] }];

      sections.forEach((section) => {
        if (!sectionMap[section._id]) {
          sectionMap[section._id] = {
            _id: section._id,
            name: section.name,
            order: section.order,
            images: section.images,
            categories: [],
          };
        }

        let categoryGroup = sectionMap[section._id].categories.find(
          (c) => c._id === category._id
        );

        if (!categoryGroup) {
          categoryGroup = {
            _id: category._id,
            name: category.name,
            order: category.order || 1,
            products: [],
          };
          sectionMap[section._id].categories.push(categoryGroup);
        }

        categoryGroup.products.push(product);
      });
    });
  });

  // Optionally sort sections and categories if needed
  return Object.values(sectionMap).sort((a, b) => a.order - b.order);
};

const StoreQuickMenu = ({
  store,
  selectedSectionId,
  setSelectedSectionId,
}: {
  store: StorePopulated;
  selectedSectionId: string | null;
  setSelectedSectionId: (id: string | null) => void;
}) => {
  const { palette } = usePreference();
  const { width } = useWindowSize();
  const is_mobile = width && width <= 640;

  const categoryGroups = group_products(store.products);
  const sectionGroups = group_sections(store.products);
  const hasSections = sectionGroups.some(
    (section) => section._id !== "no-section"
  );

  const offsetMobile = hasSections && store.use_sections ? 225 : 180;
  const offsetDesktop = hasSections && store.use_sections ? 225 : 180;

  const offset = is_mobile ? offsetMobile : offsetDesktop;

  const handleScroll = (targetName: string) => {
    const targetElement = document.querySelector(
      `[data-scroll-target="${targetName}"]`
    );
    const container = document.querySelector(".h-screen");

    if (targetElement && container) {
      const containerTop = container.getBoundingClientRect().top;
      const targetTop = targetElement.getBoundingClientRect().top;
      const scrollAmount = targetTop - containerTop - offset;

      container.scrollTo({
        top: container.scrollTop + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (sectionGroups.length > 0 && !selectedSectionId) {
      setSelectedSectionId(sectionGroups[0]._id);
    }
  }, [sectionGroups, selectedSectionId]);

  return hasSections && store.use_sections ? (
    <>
      {/* Desktop Section & Category Buttons */}
      <div className="hidden sm:flex flex-col max-w-screen-lg w-full">
        <div className="flex flex-wrap items-center justify-start h-[48px]">
          {sectionGroups.map((section) => (
            <Button
              key={section._id}
              onClick={() =>
                setSelectedSectionId(
                  selectedSectionId === section._id ? null : section._id
                )
              }
              style={{
                background:
                  selectedSectionId === section._id
                    ? palette.active_section_background
                    : palette.section_background,
                color:
                  selectedSectionId === section._id
                    ? palette.active_section_color
                    : palette.section_color,
              }}
              className={`rounded-none rounded-t-xl mr-2 px-4 flex flex-col items-center h-full py-2 text-sm ${
                selectedSectionId === section._id
                  ? "opacity-100 font-bold border-b-2"
                  : "opacity-80  border-none"
              }`}
            >
              <div
                className={`flex items-center flex-row ${
                  selectedSectionId === section._id
                    ? "opacity-100 font-bold "
                    : "opacity-80"
                }`}
              >
                {section.images[0] && (
                  <Image
                    src={section.images[0]}
                    alt={section.name}
                    width={32}
                    height={14}
                    className=" object-cover rounded-lg mr-2"
                    priority={false}
                    // sizes="(max-width: 640px) 72px, (max-width: 768px) 72px, 72px"
                    layout="fixed"
                  />
                )}

                {section.name}
              </div>
            </Button>
          ))}
        </div>

        <Divider style={{ backgroundColor: palette.color }} className="mb-2" />

        {selectedSectionId && (
          <div className="flex flex-wrap gap-2 ">
            {sectionGroups
              .find((sec) => sec._id === selectedSectionId)
              ?.categories.map((cat) => (
                <Button
                  key={cat._id}
                  onClick={() => handleScroll(cat.name)}
                  style={{ background: palette.primary }}
                  className=" border-none px-3 py-3 min-h-14 flex items-center text-sm text-white"
                >
                  {cat.name}
                </Button>
              ))}
          </div>
        )}
      </div>

      {/* Mobile Swiper */}
      <div className="max-w-screen-lg w-full sm:hidden ">
        <Swiper
          freeMode
          slidesPerView={3.5}
          spaceBetween={0}
          modules={[FreeMode]}
          className="mySwiper px-1 section-swiper"
        >
          {sectionGroups.map((section) => (
            <SwiperSlide
              className={`section-swiper-slide mr-2 rounded-t-xl bg-default ${
                selectedSectionId === section._id
                  ? "opacity-100 font-bold border-b-2"
                  : "opacity-80  border-none"
              }`}
              key={section._id}
              style={{
                background:
                  selectedSectionId === section._id
                    ? palette.active_section_background
                    : palette.section_background,
                color:
                  selectedSectionId === section._id
                    ? palette.active_section_color
                    : palette.section_color,
              }}
            >
              <div
                onClick={() =>
                  setSelectedSectionId(
                    selectedSectionId === section._id ? null : section._id
                  )
                }
                className={`rounded-none rounded-t-xl px-4 text-sm `}
              >
                <div
                  className={`flex items-center flex-row ${
                    selectedSectionId === section._id
                      ? "opacity-100 font-bold "
                      : "opacity-80"
                  }`}
                >
                  {section.images[0] && (
                    <Image
                      src={section.images[0]}
                      alt={section.name}
                      width={32}
                      height={14}
                      className=" object-cover rounded-lg mr-2"
                      priority={false}
                      // sizes="(max-width: 640px) 72px, (max-width: 768px) 72px, 72px"
                      layout="fixed"
                    />
                  )}

                  {section.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Divider style={{ backgroundColor: palette.color }} />
        {selectedSectionId && (
          <Swiper
            freeMode
            slidesPerView="auto"
            spaceBetween={8}
            modules={[FreeMode]}
            className="mySwiper px-1 mt-2"
          >
            {sectionGroups
              .find((sec) => sec._id === selectedSectionId)
              ?.categories.map((cat) => (
                <SwiperSlide key={cat._id} style={{ width: "auto" }}>
                  <div
                    onClick={() => handleScroll(cat.name)}
                    style={{ background: palette.primary }}
                    className="rounded-xl px-3 py-2 text-sm h-14 flex items-center text-white whitespace-nowrap text-center cursor-pointer"
                  >
                    {cat.name}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </>
  ) : (
    <div className="max-w-screen-lg w-full">
      <div className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 items-center justify-between max-w-screen-lg w-full">
        {categoryGroups.map((cat, idx) => (
          <Button
            key={idx}
            style={{ background: palette.primary }}
            className="rounded-2xl border-none w-full h-20 text-base text-white"
            onClick={() => handleScroll(cat.name)}
          >
            <span className="font-semibold text-wrap text-center">
              {cat.name}
            </span>
          </Button>
        ))}
      </div>
      <div className="sm:hidden">
        <Swiper
          freeMode={true}
          pagination={false}
          autoplay={false}
          allowTouchMove
          slidesPerView={3.2}
          spaceBetween={5}
          modules={[FreeMode]}
          className="mySwiper"
          breakpoints={{
            310: { slidesPerView: 3.5, spaceBetween: 5 },
          }}
        >
          {categoryGroups.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div
                style={{ background: palette.primary }}
                className="rounded-2xl border-none text-center flex items-center justify-center w-full h-20 text-base text-white font-medium transition-all px-1"
                onClick={() => handleScroll(item.name)}
              >
                <span className="font-semibold text-wrap text-center">
                  {item.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StoreQuickMenu;
