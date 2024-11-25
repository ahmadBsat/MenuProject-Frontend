"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Radio, cn } from "@nextui-org/react";

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-px w-full max-w-full hover:bg-primary/20 items-center justify-between",
          "flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-transparent",
          "data-[selected=true]:border-primary data-[selected=true]:bg-primary/20",
          "transition-all duration-200 border border-third hover:border-primary"
        ),
        label: "text-black",
        description: "text-black mt-2",
      }}
    >
      {children}
    </Radio>
  );
};

export const ThemeRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-white dark:bg-transparent hover:bg-content1/60 items-start justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 py-[10px] px-4 border-2 border-transparent",
          "data-[selected=true]:border-primary/70 h-[132px] overflow-hidden shadow-md",
          "border border-default-200"
        ),
      }}
    >
      {children}
    </Radio>
  );
};
