"use client";

import { Card, CardBody, CardHeader, cn } from "@nextui-org/react";
import type { ReactNode } from "react";

export type ListCardProps = {
  title: string;
  icon?: ReactNode;
  description?: string;
  data: string[];
  list: "ordered" | "unordered";
  className?: string;
  descriptionClassName?: string;
};

const ListCard = ({
  title,
  data,
  className,
  description,
  icon,
  list,
  descriptionClassName,
}: ListCardProps) => {
  return (
    <Card
      shadow="none"
      className={cn(
        "bg-content2 px-4 2xl:px-8 py-4 rounded-3xl min-h-64 h-full",
        className
      )}
    >
      <CardHeader className="text-xl 2xl:text-2xl w-full font-bold flex flex-col justify-start items-start gap-3">
        <div className="flex items-center justify-between w-full">
          <p className="max-w-[90%]">{title}</p>
          {icon && <div>{icon}</div>}
        </div>

        {description && (
          <p
            className={cn(
              "text-lg font-semibold text-left",
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}
      </CardHeader>

      <CardBody>
        {data.length > 0 ? (
          <ol
            className={cn(
              "flex flex-col gap-2 pl-4 text-lg 2xl:text-xl",
              list === "ordered" ? "list-decimal " : "list-disc pl-6"
            )}
          >
            {data.map((item, idx) => {
              return (
                <li key={idx} className="w-full">
                  {item}
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="flex items-center justify-center h-full text-xl">
            No new data
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ListCard;
