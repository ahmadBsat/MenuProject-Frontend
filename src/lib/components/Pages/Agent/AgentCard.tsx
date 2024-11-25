"use client";

import { URLs, getUrl } from "@/lib/constants/urls";
import { Agent } from "@/lib/types/agent";
import { LanguageParams } from "@/lib/types/page";
import { build_path, formatDates } from "@/utils/common";
import { LinkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Snippet,
} from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = { agent: Agent } & LanguageParams;

const AgentCard = ({ agent, lang }: Props) => {
  const params = useParams();
  const organization = params.organization as string;
  const agent_id = agent._id;

  const links = [
    { name: "Actions", url: URLs.organization.actions.index, icon: "" },
    { name: "Flows", url: URLs.organization.flows.index, icon: "" },
    { name: "Knowledge", url: URLs.organization.knowledge.index, icon: "" },
    {
      name: "Topics",
      url: URLs.organization.knowledge.forbidden.index,
      icon: "",
    },
  ];

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

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-1 w-full py-1">
          {links.map((item, idx) => {
            return (
              <Button
                key={idx}
                as={Link}
                href={getUrl(
                  build_path(item.url, { agent_id, organization }),
                  lang
                )}
                size="md"
                color="primary"
                variant="flat"
                className="min-w-full w-full px-4 h-16 justify-start"
                startContent={<LinkIcon className="size-4" />}
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </CardBody>

      <CardFooter className="flex sm:flex-row flex-col justify-between sm:items-center items-start gap-3 w-full">
        <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">
          Last update on{" "}
          <span className="text-primary">{formatDates(agent.updatedAt)}</span>
        </p>

        <div className="flex items-center gap-2 justify-end w-full">
          <Snippet
            radius="lg"
            hideSymbol
            variant="flat"
            size="sm"
            color="primary"
            classNames={{ base: "px-3" }}
          >
            {agent.token}
          </Snippet>

          <Button
            as={Link}
            href={getUrl(
              build_path(URLs.organization.agents.edit, {
                agent_id,
                organization,
              }),
              lang
            )}
            radius="full"
            variant="flat"
          >
            View
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
