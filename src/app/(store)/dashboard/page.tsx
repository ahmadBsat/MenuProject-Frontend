"use client";

import { Card, CardBody, Chip } from "@nextui-org/react";
import {
  BoltIcon,
  ArchiveBoxIcon,
  UsersIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import AnalyticsCard, {
  AnalyticsCardProps,
} from "@/lib/components/Common/Cards/AnalyticsCard";
import BarCard, { BarCardProps } from "@/lib/components/Common/Cards/BarCard";
import { useCallback, useEffect, useState } from "react";
import NotFound from "@/lib/components/Pages/NotFound";
import DotsLoader from "@/lib/components/Loader/DotsLoader";
import ListCard, {
  ListCardProps,
} from "@/lib/components/Common/Cards/ListCard";
import { useParams } from "next/navigation";

const DashboardPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const params = useParams();
  const organization = params.organization as string;

  const checkTrend = (val: number) => {
    if (val < 0) {
      return "down";
    }

    if (val > 0) {
      return "up";
    }

    return "idle";
  };

  const getDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const res = await API_ORGANIZATION.getOrganizationDashboard(organization);
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [organization]);

  useEffect(() => {
    getDashboard();
  }, [getDashboard]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen max-h-[calc(100vh-240px)]">
        <DotsLoader />
      </div>
    );
  }

  if (!data) {
    return <NotFound />;
  }

  const conversation: AnalyticsCardProps = {
    title: "Conversation & Contact Analytics",
    orientation: "vertical",
    data: [
      {
        title: "New Conversations",
        count: data.conversation_analytics.new_conversation_count,
        percentage: data.conversation_analytics.last_time_conversation_rate,
        trend: checkTrend(
          data.conversation_analytics.last_time_conversation_rate
        ),
      },
      {
        title: "New Contacts",
        count: data.conversation_analytics.new_contact_count,
        percentage: data.conversation_analytics.last_time_contact_rate,
        trend: checkTrend(data.conversation_analytics.last_time_contact_rate),
      },
    ],
    className: "bg-content2 text-black 2xl:h-full",
    itemClassName: "flex-col 2xl:flex-row",
  };

  const handoff: AnalyticsCardProps = {
    title: "Handoff Analytics",
    orientation: "vertical",
    data: [
      {
        title: "Human Handoff",
        count: data?.handoff.human || 0,
        percentage: data.handoff.last_time_human_rate,
        trend: checkTrend(data.handoff.last_time_human_rate),
      },
      {
        title: "Agent Handoff",
        count: data?.handoff.agent || 0,
        percentage: data.handoff.last_time_agent_rate,
        trend: checkTrend(data.handoff.last_time_agent_rate),
      },
    ],
    badge: false,
    className: "bg-content2 text-black 2xl:h-full",
    itemClassName: "flex-col 2xl:flex-row",
  };

  const apis: AnalyticsCardProps = {
    title: "APIs Analytics",
    orientation: "vertical",
    data: [
      {
        title: "Success Calls",
        count: data?.api_calls.success || 0,
        percentage: data?.api_calls?.last_week_success_rate || 0,
        trend: checkTrend(data?.api_calls?.last_week_success_rate),
      },
      {
        title: "Failed Calls",
        count: data?.api_calls.fails || 0,
        percentage: data?.api_calls?.last_week_fails_rate || 0,
        trend: checkTrend(data?.api_calls?.last_week_fails_rate),
      },
    ],
    badge: false,
    className: "bg-content2 text-black 2xl:h-full",
    itemClassName: "flex-col 2xl:flex-row",
  };

  const bars: BarCardProps = {
    title: "Most Called Actions & Knowledge",
    percentage: 0,
    trend: "up",
    data: [0.3, 0.6, 0.4, 0.6, 0.7, 0.9],
  };

  const articles: ListCardProps = {
    title: "Recent AI Generated Content",
    list: "unordered",
    data: [],
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="grid grid-cols-2 2xl:grid-cols-4 gap-2 sm:gap-4">
        <Card shadow="none" className="p-1 sm:p-4 bg-content2">
          <CardBody>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Chip
                color="primary"
                variant="flat"
                className="flex items-center justify-center"
                classNames={{ base: "w-12 max-w-12 min-w-12 h-12" }}
              >
                <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
              </Chip>

              <div className="flex flex-col">
                <p className="text-lg sm:text-xl font-bold">Conversations</p>
                <p className="sm:text-lg text-default-500 font-semibold">
                  {data?.conversations}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card shadow="none" className="p-1 sm:p-4 bg-content2">
          <CardBody>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Chip
                color="primary"
                variant="flat"
                className="flex items-center justify-center"
                classNames={{ base: "w-12 max-w-12 min-w-12 h-12" }}
              >
                <BoltIcon className="size-6" />
              </Chip>

              <div className="flex flex-col max-sm:text-center">
                <p className="text-lg sm:text-xl font-bold">Actions</p>
                <p className="sm:text-lg text-default-500 font-semibold">
                  {data?.actions}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card shadow="none" className="p-1 sm:p-4 bg-content2">
          <CardBody>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Chip
                color="primary"
                variant="flat"
                className="flex items-center justify-center"
                classNames={{ base: "w-12 max-w-12 min-w-12 h-12" }}
              >
                <ArchiveBoxIcon className="size-6" />
              </Chip>

              <div className="flex flex-col max-sm:text-center">
                <p className="text-lg sm:text-xl font-bold">Knowledge</p>
                <p className="sm:text-lg text-default-500 font-semibold">
                  {data?.knowledge}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card shadow="none" className="p-1 sm:p-4 bg-content2">
          <CardBody>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Chip
                color="primary"
                variant="flat"
                className="flex items-center justify-center"
                classNames={{ base: "w-12 max-w-12 min-w-12 h-12" }}
              >
                <UsersIcon className="size-6" />
              </Chip>
              <div className="flex flex-col max-sm:text-center">
                <p className="text-lg sm:text-xl font-bold">Contacts</p>
                <p className="sm:text-lg text-default-500 font-semibold">
                  {data?.contacts}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-2 sm:gap-4">
        <AnalyticsCard
          {...handoff}
          className="col-span-12 sm:col-span-6 xl:col-span-3"
        />
        <AnalyticsCard
          {...apis}
          className="col-span-12 sm:col-span-6 xl:col-span-3"
        />
        <AnalyticsCard
          {...conversation}
          className="col-span-12 xl:col-span-6"
        />

        <ListCard {...articles} className="col-span-12 xl:col-span-6" />

        <BarCard {...bars} className="col-span-12 xl:col-span-6" />
      </div>
    </div>
  );
};

export default DashboardPage;
