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
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
        "flex flex-col font-medium gap-1 w-full items-center justify-center text-center p-4 rounded-2xl border-3 cursor-pointer hover:bg-default-50 transition-colors"
      )}
    >
      <h2 className="text-lg font-bold">{branch.name}</h2>
      <p className="text-sm text-default-600">{branch.address}</p>
    </div>
  );
};

const StoreBranches = ({ data }: { data: StoreBranch[] }) => {
  const { branch, palette, setBranch } = usePreference();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasAppliedUrlBranch = useRef(false);

  useEffect(() => {
    if (data.length === 0) return;

    const branchParam = searchParams.get("branch");

    // Only apply URL branch parameter on FIRST load
    if (branchParam && !hasAppliedUrlBranch.current) {
      const branchFromUrl = data.find(
        (b) =>
          b._id === branchParam ||
          b.name.toLowerCase() === branchParam.toLowerCase() ||
          b.name.toLowerCase().replace(/\s+/g, "-") ===
            branchParam.toLowerCase()
      );

      if (branchFromUrl) {
        // Auto-select the branch from URL
        setBranch(branchFromUrl);
        hasAppliedUrlBranch.current = true;

        // Remove branch parameter from URL
        const url = new URL(window.location.href);
        url.searchParams.delete("branch");
        router.replace(url.pathname + url.search, { scroll: false });
        return;
      }
    }

    // If URL branch was already applied, don't check again
    if (hasAppliedUrlBranch.current) return;

    // Check if current branch exists in available branches
    const exist = data.some(
      (stored_branch) => stored_branch._id === branch._id
    );

    // Only auto-open if no valid branch is selected
    if (!branch._id || !exist) {
      setOpen(true);
    }
  }, [data, searchParams, setBranch, branch._id, router]);

  // Don't allow dismissal if no branch is selected
  const isDismissible = () => {
    return Boolean(branch._id);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} dismissible={isDismissible()}>
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
            {branch.name || "Select Branch"}
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
            {data.map((branch) => {
              return (
                <BranchCard
                  key={branch._id}
                  branch={branch}
                  setOpen={setOpen}
                />
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StoreBranches;
