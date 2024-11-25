"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { menuSlide } from "./anim";
import { Card, cn } from "@nextui-org/react";

type Props = {
  children: ReactNode;
  containerClass?: string;
};

export default function DrawerContent({ children, containerClass = "" }: Props) {
  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={cn(
        "h-screen fixed z-[9999] top-0 right-0",
        "w-full sm:max-w-[540px] bg-gray-100 text-black overscroll-contain",
        containerClass
      )}
    >
      <Card shadow="none" radius="none" fullWidth className="w-full h-full py-5 sm:px-6">
        {children}
      </Card>
    </motion.div>
  );
}
