import React from "react";
import Link from "next/link";
import { isLinkActive } from "@/utils/common";
import { Tooltip, cn } from "@nextui-org/react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { getUrl } from "@/lib/constants/urls";

type MenuItem = { name: string; link: string; icon: React.ElementType };

type SidebarItemProps = {
  item: MenuItem & {
    submenu?: MenuItem[];
  };
  collapse?: boolean;

  setSidebarOpen: (open: boolean) => void;
};

const PanelSidebarItem = ({
  item,
  setSidebarOpen,
  collapse = false,
}: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <li>
      <Tooltip
        content={item.name}
        isDisabled={!collapse}
        placement="right"
        className="bg-primary text-white"
      >
        <Link href={getUrl(item.link)}>
          <div
            className={cn(
              isLinkActive(item.link, pathname)
                ? item.submenu
                  ? "text-primary"
                  : "bg-gray-200 dark:bg-lightgray text-black dark:text-white"
                : "text-default-600 hover:text-black hover:bg-gray-200 hover:dark:text-white hover:dark:bg-lightgray",
              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200 max-h-10"
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon
              className={cn(
                collapse ? "w-full" : "w-6",
                "h-6 shrink-0 duration-300 transition-width"
              )}
              aria-hidden="true"
            />

            <motion.p
              style={{ opacity: collapse ? 0 : 1 }}
              // className="duration-250"
            >
              {item.name}
            </motion.p>
          </div>
        </Link>
      </Tooltip>

      {item.submenu && (
        <div
          className={cn(
            !collapse ? "pl-5" : "pl-0",
            "transition-all flex flex-col gap-1 mt-2"
          )}
        >
          {item.submenu.map((sub, idx) => {
            return (
              <Link key={idx} href={getUrl(sub.link)}>
                <div
                  className={cn(
                    isLinkActive(sub.link, pathname)
                      ? "bg-primary text-white"
                      : "text-white hover:text-white hover:bg-primary",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200 max-h-10"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <sub.icon
                    className={cn(
                      collapse ? "w-full" : "w-6",
                      "h-6 shrink-0 duration-300 transition-width"
                    )}
                    aria-hidden="true"
                  />

                  <motion.p
                    style={{ opacity: collapse ? 0 : 1 }}
                    className="duration-250"
                  >
                    {sub.name}
                  </motion.p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </li>
  );
};

export default PanelSidebarItem;
