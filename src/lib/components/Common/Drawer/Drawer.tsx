"use client";

import { Fragment, ReactNode } from "react";
import DrawerContent from "./DrawerContent";
import { AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { motion } from "framer-motion";
import { overlay_fade } from "./anim";
import { CardBody, CardFooter, CardHeader } from "@nextui-org/react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  show_btn?: boolean;
  containerClass?: string;
};

export default function Drawer({
  children,
  isOpen,
  setIsOpen,
  show_btn = false,
  containerClass = "",
}: Props) {
  return (
    <>
      {show_btn && (
        <div className="flex items-center pr-2 lg:hidden">
          <button
            className="burger-menu"
            aria-label="Toggle mobile menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isOpen && (
          <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setIsOpen}>
              <TransitionChild
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
                  onClick={() => setIsOpen(false)}
                />
              </TransitionChild>

              <div className="fixed inset-0 z-40 flex justify-end">
                <DialogPanel>
                  <DrawerContent containerClass={containerClass}>
                    {children}
                  </DrawerContent>
                </DialogPanel>
              </div>
            </Dialog>
          </Transition>
        )}
      </AnimatePresence>
    </>
  );
}

export const DrawerHeader = CardHeader;
export const DrawerBody = CardBody;
export const DrawerFooter = CardFooter;
