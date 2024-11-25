"use client";

import React from "react";
import { Checkbox, cn } from "@nextui-org/react";

type Props = {
  name: string;
  description: string;
  isDisabled: boolean;
};

export const CustomCheckbox = ({ name, description, isDisabled }: Props) => {
  return (
    <Checkbox
      aria-label={name}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full aspect-square bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary dark:border-0 border border-gray-300"
        ),
        label: "w-full",
      }}
      value={name}
      isDisabled={isDisabled}
    >
      <div className="w-full flex justify-between gap-2">
        <div className="flex flex-col justify-center items-start gap-2">
          <span className="text-tiny text-default-500">{name}</span>
          <span className="text-tiny text-default-500">{description}</span>
        </div>
      </div>
    </Checkbox>
  );
};
