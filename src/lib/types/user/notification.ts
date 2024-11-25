import { Meta } from "../common";

export type Notification = {
  _id: string;
  title: string;
  description: string;
  type: "info" | "error" | "warning" | "default" | "success";
  is_seen: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotificationTable = { data: Notification[]; meta: Meta };
