"use client";

import { INITIAL_META } from "@/lib/constants/initials";
import { API_BRANCH } from "@/lib/services/store/branch_service";
import { StoreBranchTable } from "@/lib/types/store/store";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import BannerUpload from "./BannerUpload";

const BannerInformation = ({ banner, handleChange }) => {
  const [loading, setLoading] = useState(true);

  const [branches, setBranches] = useState<StoreBranchTable>({
    data: [],
    meta: INITIAL_META,
  });

  const getBranches = useCallback(async () => {
    const query = `?page=${1}&limit=${10000}`;
    setLoading(true);

    try {
      const result = await API_BRANCH.getAllBranches(query);
      setBranches(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBranches();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex sm:flex-row flex-col gap-2">
        <Select
          label="Branch"
          placeholder="Select branch"
          selectionMode="multiple"
          className="w-full"
          isLoading={loading}
          isRequired
          required
          selectedKeys={new Set(banner.branch)}
          onSelectionChange={(val) => handleChange("branch", Array.from(val))}
        >
          {branches.data.map((branch) => {
            return <SelectItem key={branch._id}>{branch.name}</SelectItem>;
          })}
        </Select>
      </div>
      <BannerUpload banner={banner} type="banner" handleChange={handleChange} />
    </div>
  );
};

export default BannerInformation;
