/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { INITIAL_META } from "@/lib/constants/initials";
import { API_CATEGORY } from "@/lib/services/store/category_service";
import { CategoryTable } from "@/lib/types/store/category";
import { Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";

const ProductRelation = ({ product, handleChange }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryTable>({
    data: [],
    meta: INITIAL_META,
  });

  const getCategories = useCallback(async () => {
    const query = `page=${1}&limit=${100}`;
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

  useEffect(() => {
    getCategories();

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
        isRequired
        required
        selectedKeys={new Set(product.category)}
        onSelectionChange={(val) => handleChange("category", Array.from(val))}
      >
        {categories.data.map((category) => {
          return <SelectItem key={category._id}>{category.name}</SelectItem>;
        })}
      </Select>
    </div>
  );
};

export default ProductRelation;
