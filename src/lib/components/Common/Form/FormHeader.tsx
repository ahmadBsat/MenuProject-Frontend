"use client";

import { Button } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

const FormHeader = () => {
  const router = useRouter();

  const { width } = useWindowSize();
  const size = width && width >= 640 ? "md" : "sm";

  return (
    <div className="w-full flex items-center gap-2 justify-end">
      <Button
        size={size}
        variant="flat"
        color="danger"
        className="hover:scale-90"
        onClick={() => router.back()}
      >
        Back
      </Button>
    </div>
  );
};

export default FormHeader;
