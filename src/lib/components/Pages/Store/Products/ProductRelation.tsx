/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { INITIAL_META } from "@/lib/constants/initials";
import { API_BRANCH } from "@/lib/services/store/branch_service";
import { API_CATEGORY } from "@/lib/services/store/category_service";
import { CategoryTable } from "@/lib/types/store/category";
import { StoreBranchTable } from "@/lib/types/store/store";
import { Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";

const ProductRelation = ({ product, handleChange }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryTable>({
    data: [],
    meta: INITIAL_META,
  });
  const [branches, setBranches] = useState<StoreBranchTable>({
    data: [],
    meta: INITIAL_META,
  });

  const getCategories = useCallback(async () => {
    const query = `?page=${1}&limit=${1000}`;
    setLoading(true);

    try {
      const result = await API_CATEGORY.getAllCategories(query);
      setCategories(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getBranches = useCallback(async () => {
    const query = `?page=${1}&limit=${1000}`;
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
    getCategories();
    getBranches();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <Select
        label="Category"
        placeholder="Select product categories"
        selectionMode="multiple"
        className="w-full"
        isLoading={loading}
        selectedKeys={new Set(product.category)}
        onSelectionChange={(val) => handleChange("category", Array.from(val))}
      >
        {categories.data.map((category) => {
          return <SelectItem key={category._id}>{category.name}</SelectItem>;
        })}
      </Select>

      <Select
        label="Branch"
        placeholder="Select branch"
        selectionMode="multiple"
        className="w-full"
        isLoading={loading}
        isRequired
        required
        selectedKeys={new Set(product.branch)}
        onSelectionChange={(val) => handleChange("branch", Array.from(val))}
      >
        {branches.data.map((branch) => {
          return <SelectItem key={branch._id}>{branch.name}</SelectItem>;
        })}
      </Select>
    </div>
  );
};

export default ProductRelation;
