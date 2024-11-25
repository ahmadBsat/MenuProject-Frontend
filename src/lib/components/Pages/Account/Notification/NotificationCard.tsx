"use client";

import { useNotification } from "@/lib/context/NotificationContext";
import { Notification } from "@/lib/types/user/notification";
import { BadgeAlertIcon } from "@/utils/icons/badge-alert";
import { CheckCheckIcon } from "@/utils/icons/check-check";
import { CircleHelpIcon } from "@/utils/icons/circle-help";
import { DeleteIcon } from "@/utils/icons/delete";
import { Button } from "@nextui-org/react";
import parse from "html-react-parser";

const NotificationCard = (item: Notification) => {
  const { delete_notification } = useNotification();

  const get_notification_type = () => {
    switch (item.type) {
      case "info":
        return (
          <div className="rounded-xl p-1 bg-blue-600 text-white">
            <CircleHelpIcon />
          </div>
        );
      case "error":
        return (
          <div className="rounded-xl p-1 bg-danger text-white">
            <BadgeAlertIcon />
          </div>
        );
      case "warning":
        return (
          <div className="rounded-xl p-1 bg-yellow-600 text-white">
            <BadgeAlertIcon />
          </div>
        );
      case "default":
        return (
          <div className="rounded-xl p-1 bg-gray-500 text-white">
            <CircleHelpIcon />
          </div>
        );
      case "success":
        return (
          <div className="rounded-xl p-1 bg-success text-white">
            <CheckCheckIcon />
          </div>
        );
      default:
        return;
    }
  };

  return (
    <div className="flex gap-4 items-center rounded-xl justify-between py-4 px-4 w-full group hover:bg-primary/10 bg-content2 transition-all text-left">
      <div className="flex items-center gap-1">
        {get_notification_type()}

        <div className="flex flex-col px-2">
          <p className="font-medium text-lg mb-0.5">{item.title}</p>
          <p>{parse(item.description)}</p>
        </div>
      </div>

      <Button
        isIconOnly
        color="danger"
        variant="flat"
        onClick={() => delete_notification(item._id)}
        className="mx-2"
      >
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default NotificationCard;
