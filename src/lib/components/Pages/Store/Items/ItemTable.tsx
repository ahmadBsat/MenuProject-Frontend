/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Button,
  Input,
  Tooltip,
  SortDescriptor,
  Selection,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DeleteIcon, EyeIcon } from "@/utils/icons";
import { AiOutlineSearch } from "react-icons/ai";
import ModalInstance from "@/lib/components/Modal/Modal";
import { getUrl, URLs } from "@/lib/constants/urls";
import { INPUT_STYLE } from "@/lib/constants/style";
import { INITIAL_META } from "@/lib/constants/initials";
import { BRANCH_COLUMNS, BRANCH_VISIBLE_COL } from "@/lib/constants/tables";
import { build_path, formatDates } from "@/utils/common";
import {
  createSerializer,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import useDebounce from "@/lib/hooks/debounce";
import GeneralizedTable from "../../../Common/GeneralizedTable";
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse } from "@/lib/types/common";
import { toast } from "sonner";
import { ProductItem, ProductItemTable } from "@/lib/types/store/product";
import { API_PRODUCT_ITEMS } from "@/lib/services/store/product_items_service";

const ProductItemsTable = () => {
  const searchParams = {
    page: parseAsInteger,
    limit: parseAsString,
    search: parseAsString,
    sortField: parseAsString,
    sortOrder: parseAsString,
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [items, setItems] = useState<ProductItemTable>({
    data: [],
    meta: INITIAL_META,
  });
  const [query, setQuery] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      limit: parseAsString.withDefault("25"),
      search: parseAsString,
      sortField: parseAsString,
      sortOrder: parseAsString,
    },
    {
      history: "push",
    }
  );
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(BRANCH_VISIBLE_COL)
  );

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedProductItem, setSelectedProductItem] = useState<ProductItem>();

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return BRANCH_COLUMNS;

    return BRANCH_COLUMNS.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const onSearchChange = useCallback((value: string) => {
    setQuery({ search: value !== "" ? value : null, page: 1 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClear = useCallback(() => {
    setQuery({ search: null, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSortChange = (sort: SortDescriptor) => {
    const temp = {
      sortField: sort.column as string,
      sortOrder: sort.direction as string,
    };

    setQuery({ ...temp });
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            size="lg"
            isClearable
            className="w-full sm:max-w-[44%]"
            classNames={INPUT_STYLE}
            placeholder="Search by name"
            startContent={<AiOutlineSearch />}
            value={query.search ?? ""}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.search, onSearchChange, status, visibleColumns, onClear]);

  const renderCell = useCallback(
    (item: ProductItem, columnKey: React.Key) => {
      const cellValue = item[`${columnKey}`];

      switch (columnKey) {
        case "createdAt":
          return formatDates(cellValue);
        case "updatedAt":
          return formatDates(cellValue);
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip color="primary" content="Details">
                <Button
                  as={Link}
                  href={getUrl(
                    build_path(URLs.store.product_items.get_id, {
                      id: item._id,
                    })
                  )}
                  isIconOnly
                  size="sm"
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-transparent p-0 flex items-center justify-center"
                >
                  <EyeIcon />
                </Button>
              </Tooltip>

              <Tooltip color="danger" content="Delete ProductItem">
                <Button
                  size="sm"
                  isIconOnly
                  className="text-lg text-danger cursor-pointer active:opacity-50 bg-transparent p-0 block"
                  onClick={() => deleteModal(item)}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onOpen]
  );

  const deleteModal = (item: ProductItem) => {
    onOpen();
    setSelectedProductItem(item);
  };

  const deleteProductItem = async () => {
    if (!selectedProductItem) return;

    try {
      setProcessing(true);
      const result = await API_PRODUCT_ITEMS.deleteProductItem(
        selectedProductItem._id
      );

      if (result.success) {
        getProductItemes();
        onOpenChange();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  const getProductItemes = async () => {
    try {
      setLoading(true);
      const serialize = createSerializer(searchParams);
      const request = serialize(query);

      const res = await API_PRODUCT_ITEMS.getAllProductItems(request);

      setItems(res);
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg);
      });
    } finally {
      setLoading(false);
    }
  };

  useDebounce(
    () => {
      getProductItemes();
    },
    [query.search],
    1200
  );

  useEffect(() => {
    getProductItemes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.sortField, query.sortOrder]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <GeneralizedTable
          name="ProductItem Table"
          emptyContent={`No items added yet!`}
          selectionMode="none"
          loading={loading}
          page={items.meta.page}
          total={items.meta.total_pages}
          setPage={(v) => setQuery({ page: v })}
          columns={headerColumns}
          data={items?.data}
          topContent={topContent}
          sortDescriptor={{
            column: query.sortField as any,
            direction: query.sortOrder as any,
          }}
          setSortDescriptor={onSortChange}
          renderCell={renderCell}
        />
      </div>

      <ModalInstance
        title={"Delete ProductItem"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleClick={deleteProductItem}
        loading={processing}
      >
        <div className="flex flex-col gap-1 w-full">
          <p>Are you sure you want to delete this item?</p>
          <p className="font-bold">{selectedProductItem?.name}</p>
        </div>
      </ModalInstance>
    </>
  );
};

export default ProductItemsTable;
