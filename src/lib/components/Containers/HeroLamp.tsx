"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@nextui-org/react";

type Props = {
  title: string | ReactNode;
  loading?: boolean;
  children?: ReactNode | ReactNode[];
};

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative sm:h-96 h-52 flex flex-col items-center justify-center overflow-hidden bg-[#d6d2d3] w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-primary via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-[#d6d2d3] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-[#d6d2d3]  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-primary text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-[#d6d2d3]  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-[#d6d2d3] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#d6d2d3] blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-primary opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-primary blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-10/12 sm:w-[30rem] -translate-y-[7rem] bg-primary "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#d6d2d3]"></div>
      </div>

      <div className="absolute z-50 flex sm:top-[35%] top-[25%] flex-col items-center px-5 w-full max-w-6xl">
        {children}
      </div>
    </div>
  );
};

export function HeroLamp({ title, loading = false, children }: Props) {
  return (
    <div
      className={
        "w-full h-full flex items-center justify-center bg-primary/20 max-sm:-mt-1"
      }
    >
      {!loading ? (
        <div className="max-w-6xl flex flex-col items-center justify-center w-full h-full">
          <LampContainer>
            <motion.div
              // initial={{ opacity: 0.5, y: 100 }}
              // whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              initial="hidden"
              whileInView="show"
              className="bg-gradient-to-br from-zinc-700 to-zinc-700 py-4 bg-clip-text text-center w-full h-full"
            >
              <h1 className="text-4xl font-medium tracking-tight text-transparent lg:text-6xl xl:text-7xl text-white w-full">
                {title}
              </h1>
            </motion.div>
          </LampContainer>

          {children}
        </div>
      ) : (
        <div className="bg-primary/20 animate-pulse w-full h-52" />
      )}
    </div>
  );
}
