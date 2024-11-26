import { cn } from "@nextui-org/react";

export const SWITCH_STYLE = {
  base: cn(
    "inline-flex flex-row-reverse w-full max-w-full items-center",
    "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
    "data-[selected=true]:border-primary border-default",
    "data-[disabled=true]:opacity-disabled"
  ),
  wrapper: "p-0 h-4 overflow-visible",
  thumb: cn(
    "w-6 h-6 border-2 shadow-lg",
    "group-data-[hover=true]:border-primary",
    //selected
    "group-data-[selected=true]:ml-6",
    // pressed
    "group-data-[pressed=true]:w-7",
    "group-data-[selected]:group-data-[pressed]:ml-4"
  ),
  label: "w-full max-w-full",
};

export const INPUT_STYLE = {
  inputWrapper: "shadow-none bg-gray-100 dark:bg-zinc-800 min-w-[240px]",
  input: "placeholder:font-medium",
};

export const CARD_STYLE =
  "p-2 flex flex-col gap-4 py-4 bg-transparent sm:p-4 rounded-none lg:py-5 lg:px-4 font-semibold";

export const SELECT_STYLE = {
  base: [
    "rounded-medium",
    "text-default-500",
    "transition-opacity",
    "data-[pressed=true]:opacity-70",
    "data-[hover=true]:bg-primary/20",
    "data-[selectable=true]:focus:bg-primary/20",
    "data-[focus-visible=true]:ring-primary-300",
  ],
};
