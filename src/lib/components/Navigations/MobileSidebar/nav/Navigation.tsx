"use client";

import React from "react";
import { motion } from "framer-motion";
import { menuSlide } from "../anim";
import Curve from "./Curve";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Button, cn } from "@nextui-org/react";

export default function Navigation({ setIsActive, children, title = "" }) {
  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={cn(
        "h-screen fixed z-[9999] top-0 right-0",
        "w-full sm:max-w-96 bg-gray-100 text-black overscroll-contain"
      )}
    >
      <div className="w-full flex justify-between items-center p-4 pb-0">
        <p id="brush-title-header" className="px-2 font-magicbrush">
          {title}
        </p>

        <Button
          isIconOnly
          onClick={() => setIsActive(false)}
          className="bg-transparent text-black"
        >
          <XMarkIcon />
        </Button>
      </div>

      {children}

      <Curve />
    </motion.div>
  );
}
