"use client";

import { Card } from "@nextui-org/react";
import { useNotification } from "@/lib/context/NotificationContext";
import NotificationCard from "./NotificationCard";

const NotificationList = () => {
  const { notification } = useNotification();

  if (notification.data.length === 0) {
    return (
      <div className="sm:px-8">
        <Card shadow="none" className="p-4 sm:p-8 bg-content2 items-center">
          <p className="text-2xl sm:text-3xl">No new notifications</p>
        </Card>
      </div>
    );
  }

  return (
    <Card shadow="none" className="flex flex-col gap-3 w-full bg-transparent pt-2 pb-8 px-2 sm:px-3 mb-8">
      {notification.data.map((item, idx) => {
        return <NotificationCard key={idx} {...item} />;
      })}
    </Card>
  );
};

export default NotificationList;
