/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { INITIAL_META } from "@/lib/constants/initials";
import { SWITCH_STYLE } from "@/lib/constants/style";
import { API_BRANCH } from "@/lib/services/store/branch_service";
import { API_CATEGORY } from "@/lib/services/store/category_service";
import { API_PRODUCT_ITEMS } from "@/lib/services/store/product_items_service";
import { NestedKeyOf } from "@/lib/types/common";
import { CategoryTable } from "@/lib/types/store/category";
import { ProductForm, ProductItemTable } from "@/lib/types/store/product";
import { StoreBranchTable } from "@/lib/types/store/store";
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

const ProductRelation = ({
  product,
  handleChange,
}: {
  product: ProductForm;
  handleChange: (field: NestedKeyOf<ProductForm>, value: any) => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryTable>({
    data: [],
    meta: INITIAL_META,
  });
  const [branches, setBranches] = useState<StoreBranchTable>({
    data: [],
    meta: INITIAL_META,
  });
  const [items, setItems] = useState<ProductItemTable>({
    data: [],
    meta: INITIAL_META,
  });

  const addGroup = () => {
    const temp = [...product.additions];
    temp.push({ name: "", is_multiple: false, group: v4(), items: [] });
    handleChange("additions", temp);
  };

  const deleteGroup = (idx: number) => {
    const temp = [...product.additions];
    temp.splice(idx, 1);
    handleChange("additions", temp);
  };

  const getCategories = useCallback(async () => {
    const query = `?page=${1}&limit=${10000}`;
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

  const getProductItems = useCallback(async () => {
    const query = `?page=${1}&limit=${10000}`;
    setLoading(true);

    try {
      const result = await API_PRODUCT_ITEMS.getAllProductItems(query);
      setItems(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategories();
    getBranches();
    getProductItems();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-lg font-medium">Product Additions</p>

      {product.additions.map((record, idx) => {
        return (
          <div
            key={idx}
            className="flex flex-col gap-1 p-2 rounded-lg bg-yellow-500/20"
          >
            <Input
              label="Group Name"
              placeholder="Additions group name"
              value={record.name}
              onValueChange={(v) => handleChange(`additions[${idx}].name`, v)}
            />

            <Select
              label="Items"
              placeholder="Select product Items"
              selectionMode="multiple"
              className="w-full"
              isLoading={loading}
              selectedKeys={new Set(record.items)}
              onSelectionChange={(val) =>
                handleChange(`additions[${idx}].items`, Array.from(val))
              }
            >
              {items.data.map((item) => {
                return <SelectItem key={item._id}>{item.name}</SelectItem>;
              })}
            </Select>

            <Switch
              classNames={SWITCH_STYLE}
              isSelected={record.is_multiple}
              onValueChange={(val) =>
                handleChange(`additions[${idx}].is_multiple`, val)
              }
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Multiple Selection</p>
                <p className="text-sm">
                  Enable to multiple options for this group
                </p>
              </div>
            </Switch>

            <div>
              <Button color="danger" onClick={() => deleteGroup(idx)}>
                Remove Group
              </Button>
            </div>
          </div>
        );
      })}

      <div className="w-full">
        <Button color="success" onClick={addGroup} className="w-full">
          Add Group
        </Button>
      </div>

      <Divider className="my-4" />

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
