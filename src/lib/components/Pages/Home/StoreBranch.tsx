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

const BranchCard = ({ branch }: { branch: StoreBranch }) => {
  const { branch: selected, setBranch } = usePreference();

  return (
    <div
      onClick={() => setBranch(branch)}
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
    if (!branch._id) {
      setOpen(true);
    }
  }, [branch]);

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
          className="bg-transparent text-sm font-medium p-1 px-3 border"
          style={{ color: palette.color }}
          onClick={() => setOpen(!open)}
        >
          {branch.name}
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
              return <BranchCard key={idx} branch={branch} />;
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StoreBranches;
