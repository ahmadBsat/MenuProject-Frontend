"use client";

import { Fragment, useEffect } from "react";
import Navigation from "./nav/Navigation";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { overlay_fade } from "./anim";

export default function MobileSidebar({
  children,
  title = "",
  isActive,
  setIsActive,
  show_btn = true,
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) setIsActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {show_btn && (
        <div className="flex items-center min-w-[64px] lg:hidden">
          <button
            className="burger-menu"
            aria-label="Toggle mobile menu"
            onClick={() => setIsActive(!isActive)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isActive && (
          <Transition.Root show={isActive} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setIsActive}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <motion.div
                  variants={overlay_fade}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="fixed inset-0 bg-black bg-opacity-30"
                  onClick={() => setIsActive()}
                />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex justify-end">
                <Dialog.Panel>
                  <Navigation title={title} setIsActive={setIsActive}>
                    {children}
                  </Navigation>
                </Dialog.Panel>
              </div>
            </Dialog>
          </Transition.Root>
        )}
      </AnimatePresence>
    </>
  );
}
