"use client";

import React, { useState, useEffect } from "react";
import { fadeAnimation } from "@/utils/motion";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      toggleVisibility();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div {...fadeAnimation}>
          <Button
            className={`fixed bottom-3 right-3 md:bottom-5 md:right-10 z-50 bg-primary w-10 h-10 md:w-12 md:h-12 text-white  md:p-3 rounded-full shadow-lg cursor-pointer transition-opacity duration-500 opacity-${
              isVisible ? "100" : "0"
            }`}
            onClick={scrollToTop}
            isIconOnly
          >
            <ChevronDoubleUpIcon className="w-5 h-5 md:h-10 md:w-10" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
