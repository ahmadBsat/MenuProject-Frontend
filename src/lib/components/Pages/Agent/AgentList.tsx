"use client";

import { LanguageParams } from "@/lib/types/page";
import AgentCard from "./AgentCard";
import NotFound from "../../Pages/NotFound";
import { useAgent } from "@/store/agent";
import { URLs, getUrl } from "@/lib/constants/urls";
import DotsLoader from "../../Loader/DotsLoader";
import { useParams } from "next/navigation";
import { build_path } from "@/utils/common";
import { useEffect } from "react";

const AgentList = ({ lang }: LanguageParams) => {
  const params = useParams();
  const organization = params.organization as string;

  const { agents, loading, error, getAgents } = useAgent();

  useEffect(() => {
    getAgents(organization);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen max-h-[calc(100vh-250px)] ">
        <DotsLoader />
      </div>
    );
  }

  if (error) {
    return (
      <NotFound description={error} error="Could get organization agents" />
    );
  }

  if (agents.meta.count === 0) {
    return (
      <NotFound
        title="Create Agent"
        error="No Agents Yet!"
        description="You don't have any agents created yet."
        url={getUrl(
          build_path(URLs.organization.agents.create, { organization }),
          lang
        )}
      />
    );
  }

  return (
    <div  className="grid grid-cols-1 w-full gap-0">
      {agents.data.map((agent, idx) => {
        return <AgentCard key={idx} agent={agent}  />;
      })}
    </div>
  );
};

export default AgentList;
