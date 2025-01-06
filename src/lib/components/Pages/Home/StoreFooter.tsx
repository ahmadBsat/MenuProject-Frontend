"use client";

import { StorePopulated } from "@/lib/types/store/store";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const StoreFooter = ({ store }: { store: StorePopulated }) => {
  return (
    <div className="flex items-center justify-center w-full min-h-14 max-h-32 border-t">
      <div className="flex items-center justify-center max-w-screen-lg px-8 w-full text-xl">
        <Button
          as={Link}
          href="http://www.facilitymanagementcorporation.com/"
          target="_blank"
          className="px-2 bg-transparent text-xl w-fit min-w-fit underline"
          style={{ color: store.palette.color }}
        >
          Create your digital menu
        </Button>
      </div>
    </div>
  );
};

export default StoreFooter;
