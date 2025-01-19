"use client";

/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { URLs, getUrl } from "@/lib/constants/urls";
import { Button, cn } from "@nextui-org/react";
import PanelSidebarItem from "./PanelSidebarItem";
import { useAuth } from "@/lib/context/AuthContext";

const PanelSidebarMobile = ({
  sidebarOpen,
  setSidebarOpen,
  navigations,
  width,
}) => {
  const { logout, user } = useAuth();

  return (
    <Transition show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={setSidebarOpen}
      >
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary/40" />
        </TransitionChild>

        <div className="fixed inset-0 flex w-full">
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel
              className={cn(
                width && width > 460 && "max-w-xs",
                "relative flex w-full flex-1"
              )}
            >
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 ring-1 bg-white">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Link
                      href={getUrl(URLs.admin.dashboard)}
                      className="flex h-16 relative shrink-0 items-center"
                    >
                      FMC
                    </Link>
                  </div>

                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="bg-primary p-1 px-4 rounded-full text-white font-semibold">
                  {user?.user.email}
                </div>

                <nav className="flex flex-1 flex-col">
                  <div className="flex flex-1 flex-col gap-y-7">
                    {navigations.map((item, idx) => {
                      return (
                        <div key={idx} className="flex flex-col gap-2">
                          <div className="uppercase text-default-500 text-xs font-bold tracking-tight">
                            {item.title}
                          </div>

                          <ul className="-mx-2 space-y-1.5">
                            {item.data.map((menu, index) => {
                              return (
                                <PanelSidebarItem
                                  key={index}
                                  item={menu}
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

                <Button color="primary" onClick={logout} className="w-full">
                  Logout
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PanelSidebarMobile;
