"use client";

import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardHeader, cn } from "@nextui-org/react";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

type ItemProps = {
  title: string;
  count: number;
  percentage: number;
  trend: "up" | "down" | "idle";
};

export type AnalyticsCardProps = {
  title: string;
  orientation: "vertical" | "horizontal";
  data: ItemProps[];
  badge?: boolean;
  className?: string;
  itemClassName?: string;
};

const AnalyticsCard = ({
  title,
  orientation,
  data,
  badge = true,
  className,
  itemClassName,
}: AnalyticsCardProps) => {
  return (
    <Card
      shadow="none"
      className={cn(
        "bg-content2 px-4 2xl:px-8 py-4 rounded-3xl min-h-64",
        className
      )}
    >
      <CardHeader className="text-xl font-bold">{title}</CardHeader>

      <CardBody
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-row gap-8" : "flex-col gap-4"
        )}
      >
        {data.map((item, idx) => {
          return (
            <div
              key={idx}
              className={cn(
                "flex w-full 2xl:items-center justify-between gap-2",
                itemClassName
              )}
            >
              <div className="flex flex-col">
                <p className="text-base text-default-500 font-normal">
                  {item.title}
                </p>
                <div className="text-2xl 2xl:text-3xl flex items-center gap-1">
                  {item.count}{" "}
                  {badge && (
                    <div className="size-5 text-primary">
                      <CheckBadgeIcon />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <div
                  className={cn(
                    item.trend === "up"
                      ? "text-success"
                      : item.trend === "down"
                      ? "text-danger"
                      : "text-default-500",
                    "flex items-center"
                  )}
                >
                  {item.trend === "up" ? (
                    <TrendingUpIcon />
                  ) : (
                    item.trend === "down" && <TrendingDownIcon />
                  )}
                  {item.trend === "up" ? "+" : ""}
                  {item.percentage.toFixed(0)}%
                </div>
                <p className="text-default-400 text-sm">from last week</p>
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default AnalyticsCard;
