"use client";

import { cn } from "@nextui-org/react";
import React, { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  descripton?: string;
  children?: ReactNode | ReactNode[];
  className?: string;
};

const PageHeader = ({
  title,
  descripton,
  children,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn("w-full flex flex-col items-center gap-1", className)}>
      <div className="w-full flex flex-col items-center gap-8 px-2 text-center">
        <h2 className="font-bold text-2xl lg:text-4xl xl:text-[54px] max-w-lg leading-10 tracking-wide">
          {title}
        </h2>

        {descripton && (
          <p className="lg:text-2xl text-base max-w-[550px] w-full">
            {descripton}
          </p>
        )}
      </div>

      {children}
    </div>
  );
};

export default PageHeader;
