"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Radio, cn } from "@nextui-org/react";

const ThemeRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      disableAnimation
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

export default ThemeRadio;
