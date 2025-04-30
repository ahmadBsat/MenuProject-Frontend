"use client";

import { INITIAL_META } from "@/lib/constants/initials";
import { API_SECTION } from "@/lib/services/store/section_service";
import { StoreSectionTable } from "@/lib/types/store/store";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";

const CategoryInformation = ({ category, handleChange }) => {
  const [loading, setLoading] = useState(true);

  const [sections, setSections] = useState<StoreSectionTable>({
    data: [],
    meta: INITIAL_META,
  });

  const getBranches = useCallback(async () => {
    const query = `?page=${1}&limit=${10000}`;
    setLoading(true);

    try {
      const result = await API_SECTION.getAllSections(query);
      setSections(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBranches();
  }, []);
  return (
    <div className="w-full flex flex-col gap-2">
      <Input
        label="Name"
        type="text"
        placeholder="Name"
        isRequired
        required
        value={category.name}
        onValueChange={(e) => handleChange("name", e)}
      />

      <Input
        label="Order"
        type="number"
        placeholder="Order"
        isRequired
        required
        value={category.order?.toString()}
        onValueChange={(e) => handleChange("order", Number(e))}
      />

      <div className="flex sm:flex-row flex-col gap-2">
        <Select
          label="Section"
          placeholder="Select Section"
          selectionMode="multiple"
          className="w-full"
          isLoading={loading}
          // isRequired
          // required
          selectedKeys={new Set(category.section)}
          onSelectionChange={(val) => handleChange("section", Array.from(val))}
        >
          {sections.data.map((section) => {
            return <SelectItem key={section._id}>{section.name}</SelectItem>;
          })}
        </Select>
      </div>
    </div>
  );
};

export default CategoryInformation;
