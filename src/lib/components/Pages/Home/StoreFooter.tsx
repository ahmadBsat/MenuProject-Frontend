"use client";

import { StorePopulated } from "@/lib/types/store/store";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const StoreFooter = ({ store }: { store: StorePopulated }) => {
  return (
    store.watermark && (
      <div className="flex items-center justify-center w-full min-h-14 max-h-32">
        <div className="flex items-center justify-center max-w-screen-lg px-8 pb-8 w-full text-xl">
          <Button
            as={Link}
            href="https://www.facilitymanagementcorporation.com/contact-us-digital-marketing-solutions"
            target="_blank"
            radius="full"
            className="px-4 py-4 h-14 bg-transparent text-xl w-fit min-w-fit border"
            style={{ color: store.palette.color }}
          >
            Create your Digital Menu
          </Button>
        </div>
      </div>
    )
  );
};

export default StoreFooter;
