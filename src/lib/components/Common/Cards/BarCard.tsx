"use client";

import { Card, CardBody, CardHeader, Slider, cn } from "@nextui-org/react";
import { FaArrowUp } from "react-icons/fa";

export type BarCardProps = {
  title: string;
  percentage: number;
  trend: "up" | "down";
  data: number[];
  className?: string;
};

const BarCard = ({
  title,
  data,
  percentage,
  trend,
  className,
}: BarCardProps) => {
  return (
    <Card
      shadow="none"
      className={cn(
        "bg-content2 px-4 2xl:px-8 py-4 rounded-3xl h-1/2 min-h-[400px] max-h-[400px]",
        className
      )}
    >
      <CardHeader className="text-xl 2xl:text-2xl font-bold">{title}</CardHeader>

      <CardBody className="flex flex-row justify-between gap-4 w-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "text-2xl size-10 p-1 flex items-center text-white justify-center rounded-full",
                trend === "up" ? "bg-success" : "bg-danger"
              )}
            >
              <FaArrowUp />
            </div>
            <p className="text-3xl mt-1">
              {trend === "up" ? "+" : "-"}
              {percentage}%
            </p>
          </div>
          <p className="text-default-400 text-sm mt-2 px-4">from last week</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-4 h-full">
            {data.map((count, idx) => {
              const is_lower = idx > 0 && data[idx - 1] > count;

              return (
                <div key={idx} className="flex flex-col">
                  <Slider
                    size="lg"
                    step={0.01}
                    maxValue={1}
                    minValue={0}
                    hideThumb
                    isDisabled
                    color={is_lower ? "danger" : "success"}
                    orientation="vertical"
                    aria-label="q2"
                    defaultValue={count}
                    classNames={{ track: "bg-white w-6 2xl:w-10" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BarCard;
