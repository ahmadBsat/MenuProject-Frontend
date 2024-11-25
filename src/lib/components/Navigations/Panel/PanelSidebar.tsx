"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useWindowSize } from "@uidotdev/usehooks";
import { ADMIN_NAVIGATION } from "@/lib/constants/menu";
import PanelSidebarItem from "./PanelSidebarItem";
import { Button, cn } from "@nextui-org/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import PanelSidebarMobile from "./PanelSidebarMobile";
import { URLs, getUrl } from "@/lib/constants/urls";
import { useDocumentDirection } from "@/lib/hooks/useDocumentDirection";

const PanelSidebar = ({ children, lang }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);

  // const timeoutRef = useRef<number | null>(null);

  const { width } = useWindowSize();
  const { rtl } = useDocumentDirection(lang);

  const navigations = ADMIN_NAVIGATION;
  const padding_class = collapse
    ? rtl
      ? "lg:pr-20"
      : "lg:pl-20"
    : rtl
    ? "lg:pr-64"
    : "lg:pl-64";

  return (
    <div className="h-full min-h-screen bg-background">
      {/* PHONE MENU */}
      <PanelSidebarMobile
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        navigations={navigations}
        width={width}
      />

      {/* Static sidebar for desktop */}
      <div
        className={cn(
          collapse ? "lg:w-20" : "lg:w-64",
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all"
        )}
      >
        <div
          className={cn(
            rtl ? "lg:border-l" : "lg:border-r",
            "flex grow flex-col gap-y-5 overflow-y-auto bg-background dark:border-black/20 dark:bg-mediumgray px-6 overflow-x-hidden"
          )}
        >
          <div
            className={cn(
              collapse ? "opacity-0" : "opacity-100",
              "flex gap-3 pt-6 items-center dark:text-white text-2xl font-semibold outline-none ring-0 select-none mb-4"
            )}
          >
            <Link href={getUrl(URLs.admin.dashboard, lang)}>FMC</Link>
          </div>

          <nav className="flex flex-1 flex-col justify-between">
            <div className={cn("gap-y-7", "flex flex-1 flex-col")}>
              {navigations.map((item, idx) => {
                return (
                  <div key={idx} className="flex flex-col gap-2">
                    {!collapse && (
                      <div className="uppercase text-default-500 text-xs font-bold tracking-tight">
                        {item.title}
                      </div>
                    )}

                    <ul className="-mx-2 space-y-1.5">
                      {item.data.map((menu, index) => {
                        return (
                          <PanelSidebarItem
                            key={index}
                            item={menu}
                            collapse={collapse}
                            setSidebarOpen={setSidebarOpen}
                          />
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>

        <Button
          isIconOnly
          onClick={() => setCollapse(!collapse)}
          className={cn(
            !collapse && "rotate-180",
            rtl ? "-left-4" : "-right-4",
            "absolute top-5 bg-primary text-white"
          )}
        >
          {rtl ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Button>
      </div>

      {/* PHONE MENU BUTTON */}
      <div className="static top-0 z-40 flex items-center justify-between gap-x-6 bg-zinc-900 px-4 py-4 sm:shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-white lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* CONTENT WRAPPER */}
      <main className={cn(padding_class, "transition-spacing")}>
        <div className="font-medium px-2 sm:px-8 py-6">{children}</div>
      </main>
    </div>
  );
};

export default PanelSidebar;