/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { StoreBranch } from "@/lib/types/store/store";
import { usePreference } from "@/store/account";
import { Button, cn } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerHeader,
} from "../../Common/drawer";
import { useEffect, useState } from "react";

const BranchCard = ({
  branch,
  setOpen,
}: {
  branch: StoreBranch;
  setOpen: (val: boolean) => void;
}) => {
  const { branch: selected, setBranch } = usePreference();

  return (
    <div
      onClick={() => {
        setBranch(branch);
        setOpen(false);
      }}
      className={cn(
        selected._id === branch._id && "border-primary",
        "flex flex-col font-medium gap-1 w-full items-center justify-center text-center p-4 rounded-2xl border-3"
      )}
    >
      <h2 className="text-lg font-bold">{branch.name}</h2>
      <p>{branch.address}</p>
    </div>
  );
};

const StoreBranches = ({ data }: { data: StoreBranch[] }) => {
  const { branch, palette } = usePreference();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const exist = data.some(
      (stored_branch) => stored_branch._id === branch._id
    );

    if (!branch._id || !exist) {
      setOpen(true);
    }
  }, [branch, data]);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      dismissible={branch._id ? true : false}
    >
      <DrawerTrigger asChild>
        <Button
          size="sm"
          radius="full"
          endContent={<ChevronRight size={16} />}
          className="bg-transparent text-xs sm:text-sm font-medium p-1 px-3 border"
          style={{
            color: palette.header_text_color || palette.color,
            borderColor: palette.header_text_color || palette.color,
          }}
          onClick={() => setOpen(!open)}
        >
          <span className="whitespace-nowrap overflow-hidden text-ellipsis block max-sm:max-w-[50px]">
            {branch.name}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Choose Branch</DrawerTitle>
            <DrawerDescription>
              Select one of the available branches.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-8 flex flex-col gap-6">
            {data.map((branch, idx) => {
              return <BranchCard key={idx} branch={branch} setOpen={setOpen} />;
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StoreBranches;
