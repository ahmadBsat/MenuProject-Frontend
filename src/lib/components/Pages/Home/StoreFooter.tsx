"use client";

import { StorePopulated } from "@/lib/types/store/store";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const StoreFooter = ({ store }: { store: StorePopulated }) => {
  return (
    <div className="flex flex-col  items-center justify-center w-full min-h-14 py-4 max-h-32 border-t">
      {store.watermark && (
        <div className="flex items-center justify-center max-w-screen-lg mt-1 w-full text-xl">
          <Button
            as={Link}
            href="https://www.facilitymanagementcorporation.com/contact-us-digital-marketing-solutions"
            target="_blank"
            radius="full"
            className="px-4 py-4 h-14 bg-transparent text-lg w-fit min-w-fit border "
            style={{ color: store.palette.color }}
          >
            Create your Digital Menu
          </Button>
        </div>
      )}
      <div className="text-default-400 text-sm pt-2">Powered by FMC</div>
    </div>
  );
};

export default StoreFooter;
