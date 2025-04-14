"use client";

import { getUrl, URLs } from "@/lib/constants/urls";
import { StorePopulated } from "@/lib/types/store/store";
import { Button } from "@nextui-org/react";
import { Home, Map, Search } from "lucide-react";
import { Info } from "lucide-react";
import Link from "next/link";

const StoreAccessLinks = ({ store }: { store: StorePopulated }) => {

  const origin = window.location.origin;
  const storeLink =
    store.custom_domain.length > 0
      ? store.custom_domain
      : origin + "/" + store.domain;

  return (
    <div className="min-h-14 max-h-32 z-50">
      <div
        className="flex fixed bottom-0 left-0 items-center justify-center w-full min-h-14 max-h-32"
        style={{
          background:
            store.palette.header_background || store.palette.background,
          color: store.palette.header_text_color || store.palette.color,
        }}
      >
        <div className="grid grid-cols-4 gap-6 lg:w-full items-center justify-between max-w-screen-md px-6">
          <div className="flex items-center justify-center w-full">
            <Button
              as={Link}
              href={storeLink + getUrl(URLs.home)}
              isIconOnly
              variant="bordered"
              style={{
                color: store.palette.header_text_color || store.palette.color,
              }}
            >
              <Home size={18} className="font-bold size-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center w-full">
            <Button
              as={Link}
              href={storeLink + getUrl(URLs.search)}
              isIconOnly
              variant="bordered"
              style={{
                color: store.palette.header_text_color || store.palette.color,
              }}
            >
              <Search size={18} className="font-bold size-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center w-full">
            <Button
              as={Link}
              href={storeLink + getUrl(URLs.about)}
              isIconOnly
              variant="bordered"
              style={{
                color: store.palette.header_text_color || store.palette.color,
              }}
            >
              <Info className="font-bold size-6" />
            </Button>
          </div>

          <div className="flex items-center justify-center w-full">
            <Button
              as={Link}
              href={storeLink + getUrl(URLs.branch)}
              isIconOnly
              variant="bordered"
              style={{
                color: store.palette.header_text_color || store.palette.color,
              }}
            >
              <Map size={18} className="font-bold size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreAccessLinks;
