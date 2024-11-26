/* eslint-disable @typescript-eslint/no-unused-vars */
import { URLs } from "./urls";
import {
  InboxIcon,
  RectangleStackIcon,
  UsersIcon,
  ShoppingCartIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

export const ADMIN_NAVIGATION = [
  {
    title: "General",
    data: [
      {
        key: "dashboard",
        name: "Dashboard",
        link: URLs.admin.dashboard,
        icon: RectangleStackIcon,
      },
      {
        key: "stores",
        name: "Stores",
        link: URLs.admin.stores.index,
        icon: ShoppingCartIcon,
      },
      {
        key: "users",
        name: "Users",
        link: URLs.admin.users.index,
        icon: UsersIcon,
      },
      {
        key: "plans",
        name: "Plans",
        link: URLs.admin.plans.index,
        icon: DocumentIcon,
      },
    ],
  },
];
