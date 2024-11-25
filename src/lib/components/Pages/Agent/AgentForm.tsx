"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUrl, URLs } from "@/lib/constants/urls";
import { Button, Spinner, Tab, Tabs } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse, NestedKeyOf } from "@/lib/types/common";
import NotFound from "../../Pages/NotFound";
import { LanguageParams } from "@/lib/types/page";
import { AgentForm } from "@/lib/types/agent";
import { API_AGENT } from "@/lib/services/agent_service";
import HeaderContainer from "../../Containers/HeaderContainer";
import { AGENT_INITIAL } from "@/lib/constants/initials";
import AgentInformation from "./AgentInformation";
import AgentSetting from "./AgentSetting";
import AgentNetwork from "./AgentNetwork";
import { set } from "lodash";
import { useQueryState } from "nuqs";
import AgentLogo from "./AgentLogo";
import AgentReview from "./AgentReview";
import { useAgent } from "@/store/agent";
import AgentVariables from "./AgentVariables";
import { build_path } from "@/utils/common";
import { toast } from "sonner";

const AgentsForm = ({ lang }: LanguageParams) => {
  const [agent, setAgent] = useState<AgentForm>(AGENT_INITIAL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editable, setEditable] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [tab, setTab] = useQueryState("tab", { history: "replace" });

  const params = useParams();
  const router = useRouter();
  const agent_id = params.id as string;
  const organization = params.organization as string;

  const { getAgents } = useAgent();
  const { width } = useWindowSize();
  const size = width && width >= 640 ? "md" : "sm";

  useEffect(() => {
    getAgent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, organization]);

  const getAgent = async () => {
    if (!params.id) {
      setLoading(false);
      setEditable(true);
      return;
    }

    if (!organization) return;

    try {
      setLoading(true);
      const id = params.id as string;

      const result = await API_AGENT.getAgentById(organization, id);

      setAgent(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveAgent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!organization) return;

    const id = "agent-create";

    setProcessing(true);
    toast.loading("Creating agent...", { id });

    try {
      const res = await API_AGENT.createAgent(organization, agent);
      await getAgents(organization);

      toast.success(res.message, { id });

      const redirect = build_path(URLs.organization.agents.index, {
        organization,
      });
      router.push(getUrl(redirect, lang));
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg, { id });
      });
    } finally {
      setProcessing(false);
    }
  };

  const updateAgent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!organization) return;

    const id = "agent-update";

    setProcessing(true);
    toast.loading("Updating agent...", { id });

    try {
      const res = await API_AGENT.updateAgent(organization, agent_id, agent);
      await getAgents(organization);

      toast.success(res.message, { id });

      const redirect = build_path(URLs.organization.agents.index, {
        organization,
      });
      router.push(getUrl(redirect, lang));
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg, { id });
      });
    } finally {
      setProcessing(false);
    }
  };

  const deleteAgent = async () => {
    if (!organization) return;

    const id = "agent-delete";

    setProcessing(true);
    toast.loading("Deleting agent...", { id });

    try {
      const res = await API_AGENT.deleteAgent(organization, agent_id);
      await getAgents(organization);

      toast.success(res.message, { id });

      const redirect = build_path(URLs.organization.agents.index, {
        organization,
      });
      router.push(getUrl(redirect, lang));
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg, { id });
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (field: NestedKeyOf<AgentForm>, value: any) => {
    const temp = { ...agent };

    set(temp, field, value);

    setAgent(temp);
  };

  const HeaderContent = () => {
    return (
      <div className="w-full flex items-center gap-2 justify-end">
        <Button
          size={size}
          color="danger"
          variant="flat"
          className="hover:scale-90"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!agent) {
    return (
      <NotFound
        url={getUrl(
          build_path(URLs.organization.agents.index, { organization })
        )}
        title="Agents"
      />
    );
  }

  return (
    <form
      onSubmit={(e) => (params.id ? updateAgent(e) : saveAgent(e))}
      className="w-full h-full flex flex-col justify-center gap-6"
    >
      <HeaderContainer
        
        title={params.id ? `Update Agent ${agent.name}` : "Create New Agent"}
      >
        <HeaderContent />
      </HeaderContainer>

      <Tabs
        aria-label="Product Tabs"
        size="lg"
        variant="underlined"
        selectedKey={tab}
        onSelectionChange={(val) => setTab(val.toString())}
        classNames={{ tab: "text-lg sm:text-2xl" }}
      >
        <Tab key={"logo"} title={"Logo"} className="pl-0">
          <AgentLogo
            path={`organization/${organization}`}
            
            data={agent}
            editable={editable}
            handleChange={handleChange}
          />
        </Tab>

        <Tab key={"information"} title={"Information"} className="pl-0">
          <AgentInformation
            
            data={agent}
            editable={editable}
            handleChange={handleChange}
          />
        </Tab>

        <Tab key={"settings"} title={"Settings"} className="pl-0">
          <AgentSetting
            
            data={agent}
            editable={editable}
            handleChange={handleChange}
          />
        </Tab>

        <Tab key={"network"} title={"Network"} className="pl-0">
          <AgentNetwork
            
            data={agent}
            editable={editable}
            handleChange={handleChange}
          />
        </Tab>

        <Tab key={"variables"} title={"Variables"} className="pl-0">
          <AgentVariables
            
            data={agent}
            editable={editable}
            handleChange={handleChange}
          />
        </Tab>

        <Tab key={"review"} title={"Review"} className="pl-0">
          <AgentReview data={agent}  />

          <div className="w-full flex justify-end gap-2 mt-6">
            {params.id && (
              <Button
                type="submit"
                isDisabled={processing}
                color="danger"
                variant="flat"
                onClick={deleteAgent}
              >
                Delete
              </Button>
            )}

            <Button
              type="submit"
              isDisabled={processing}
              color="primary"
              variant="flat"
            >
              {params.id ? "Update" : "Save"}
            </Button>
          </div>
        </Tab>
      </Tabs>
    </form>
  );
};

export default AgentsForm;
