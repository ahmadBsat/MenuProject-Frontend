/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { StoreBranch } from "@/lib/types/store/store";
import { usePreference } from "@/store/account";
import { Button, cn } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerHeader,
} from "../../Common/drawer";

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

const StoreBranches = () => {
  const { branch, setBranch } = usePreference();
  const [branches, setBranches] = useState<StoreBranch[]>([]);
  const data = [
    {
      name: "Branch1",
      address:
        "المعمورة - الشارع العام - قرب صيدلية المعمورة - مقابل محطة الامانة",
      _id: "1",
    },
    { name: "Branch2", address: "Badaro Main Street", _id: "2" },
  ];

  useEffect(() => {
    setBranches(data as any);

    if (!branch._id) {
      setBranch(data[0] as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branch._id, setBranch]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size="sm"
          radius="full"
          endContent={<ChevronRight size={16} />}
          className="bg-transparent text-sm font-medium p-1 px-3 border"
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
            {branches.map((branch, idx) => {
              return <BranchCard key={idx} branch={branch} />;
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StoreBranches;
