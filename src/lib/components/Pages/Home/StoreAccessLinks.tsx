"use client";

import { StorePopulated } from "@/lib/types/store/store";
import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import { Info } from "lucide-react";

const StoreAccessLinks = ({ store }: { store: StorePopulated }) => {
  return (
    <div className="min-h-14 max-h-32 z-50">
      <div
        className="flex fixed bottom-0 left-0 items-center justify-center w-full min-h-14 max-h-32"
        style={{
          background: store.palette.header_background || store.palette.background,
          color: store.palette.header_text_color || store.palette.color,
        }}
      >
        <div className="grid grid-cols-4 items-center justify-between max-w-screen-lg px-6 w-full">
          <div>
            <Button
              isIconOnly
              variant="bordered"
              style={{
                color: store.palette.header_text_color || store.palette.color,
              }}
            >
              <Search size={18} className="font-bold size-5" />
            </Button>
          </div>
          <div>
            <Button
              isIconOnly
              variant="bordered"
              style={{
                color: store.palette.header_text_color || store.palette.color,
              }}
            >
              <Info className="font-bold size-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreAccessLinks;
