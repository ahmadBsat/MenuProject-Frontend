/* eslint-disable @typescript-eslint/no-unused-vars */
import { URLs } from "./urls";
import {
  InboxIcon,
  RectangleStackIcon,
  UsersIcon,
  ShoppingCartIcon,
  DocumentIcon,
  BuildingOfficeIcon,
  SquaresPlusIcon,
  ArchiveBoxIcon,
  TagIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  QueueListIcon
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

export const STORE_NAVIGATION = [
  {
    title: "General",
    data: [
      {
        key: "branches",
        name: "Branches",
        link: URLs.store.branch.index,
        icon: BuildingOfficeIcon,
      },
      {
        key: "products",
        name: "Products",
        link: URLs.store.products.index,
        icon: ArchiveBoxIcon,
      },
      {
        key: "additions",
        name: "Additions",
        link: URLs.store.product_items.index,
        icon: SquaresPlusIcon,
      },
      {
        key: "categories",
        name: "Categories",
        link: URLs.store.category.index,
        icon: TagIcon,
      },
      {
        key: "currencies",
        name: "Currencies",
        link: URLs.store.currencies.index,
        icon: CurrencyDollarIcon,
      },
      {
        key: "banners",
        name: "banners",
        link: URLs.store.banners.index,
        icon: PhotoIcon,
      },
      {
        key: "sections",
        name: "sections",
        link: URLs.store.sections.index,
        icon: QueueListIcon,
      },
    ],
  },
];
