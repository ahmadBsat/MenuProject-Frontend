"use client";

import { formatDates } from "@/utils/common";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";

const AgentCard = ({ agent }) => {
  return (
    <Card
      shadow="none"
      radius="none"
      className="p-0 sm:py-5 border-b bg-transparent"
    >
      <CardHeader className="flex flex-row gap-2 w-full">
        {agent.logo && (
          <div>
            <Image
              src={agent.logo}
              alt={agent.name}
              className="rounded-full size-12"
            />
          </div>
        )}

        <div className="flex flex-col gap-1 items-start leading-5 text-sm text-left font-bold">
          <Chip
            className={
              agent.type === "agent"
                ? "bg-green-700/20 text-green-700 dark:text-green-500"
                : "bg-blue-700/20 text-blue-700 dark:text-blue-500"
            }
          >
            {agent.type}
          </Chip>
          <p className="mt-1 px-1 text-lg">{agent.name}</p>
        </div>
      </CardHeader>

      <CardBody className="flex flex-col gap-4">
        <p className="line-clamp-3 text-ellipsis white max-w-[700px] text-sm md:text-base">
          {agent.prompt_message}
        </p>
      </CardBody>

      <CardFooter className="flex sm:flex-row flex-col justify-between sm:items-center items-start gap-3 w-full">
        <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">
          Last update on{" "}
          <span className="text-primary">{formatDates(agent.updatedAt)}</span>
        </p>

        <div className="flex items-center gap-2 justify-end w-full">
          <Button radius="full" variant="flat">
            View
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
