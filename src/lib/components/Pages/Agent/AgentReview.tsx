"use client";

import { AgentForm } from "@/lib/types/agent";
import { Card, Chip, Divider } from "@nextui-org/react";
import { CARD_STYLE } from "@/lib/constants/style";
import { LanguageParams } from "@/lib/types/page";
import { languageData } from "@/lib/i18n/settings";

type Props = { data: AgentForm } & LanguageParams;

const AgentReview = ({ data, lang }: Props) => {
  return (
    <div  className="w-full flex flex-col gap-4">
      <Card shadow="none" className={CARD_STYLE}>
        <div className="text-lg sm:text-xl px-1">Review</div>

        <div className="flex flex-col gap-2 w-full px-2">
          <div className="grid gap-2 lg:gap-0 lg:grid-cols-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="text-base text-primary">Name: </div>
                <p className="capitalize">{data.name}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-base text-primary">Type: </div>
                <p className="capitalize">{data.type}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-base text-primary">Model: </div>
                <p className="uppercase">{data.model}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-base text-primary">Language: </div>
                <p className="capitalize">
                  {languageData[data.language].localName}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="text-base min-w-28">Status: </div>

                <Chip color={data.is_active ? "success" : "danger"}>
                  {data.is_active ? "Active" : "Disabled"}
                </Chip>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-base min-w-28">Privacy: </div>

                <Chip color={data.enhanced_privacy ? "success" : "danger"}>
                  {data.enhanced_privacy ? "Active" : "Disabled"}
                </Chip>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="text-base text-primary">Website: </div>

                <p>{data.website}</p>
              </div>

              <div className="flex items-start gap-2">
                <div className="text-base text-primary">Domains: </div>

                <div className="flex flex-col">
                  {data.domains.map((domain, idx) => {
                    return <p key={idx}>{domain}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>

          <Divider className="bg-primary/40 my-8" />

          <div className="flex flex-col gap-2">
            <p className="text-primary">Prompt:</p>

            <p className="whitespace-pre-line">{data.prompt_message}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AgentReview;
