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
  User,
  Chip,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DeleteIcon, EyeIcon } from "@/utils/icons";
import { AiOutlineSearch } from "react-icons/ai";
import ModalInstance from "@/lib/components/Modal/Modal";
import { getUrl, URLs } from "@/lib/constants/urls";
import { INPUT_STYLE } from "@/lib/constants/style";
import { INITIAL_META } from "@/lib/constants/initials";
import { PRODUCT_COLUMNS, PRODUCT_VISIBLE_COL } from "@/lib/constants/tables";
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
import { Product, ProductTable } from "@/lib/types/store/product";
import { API_PRODUCT } from "@/lib/services/store/product_service";

const ProductsTable = () => {
  const searchParams = {
    page: parseAsInteger,
    limit: parseAsString,
    search: parseAsString,
    sortField: parseAsString,
    sortOrder: parseAsString,
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [products, setProducts] = useState<ProductTable>({
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
    new Set(PRODUCT_VISIBLE_COL)
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [status, setStatus] = useState<Selection>("all");

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return PRODUCT_COLUMNS;

    return PRODUCT_COLUMNS.filter((column) =>
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

  const handleSelectionChange = (newSelection: Selection) => {
    if (newSelection === "all" && products) {
      const currentPageKeys = products.data.map((product) => product._id);

      setSelectedKeys((prevKeys) => {
        const updatedKeys = new Set(prevKeys);
        currentPageKeys.forEach((key) => updatedKeys.add(key));
        return updatedKeys;
      });
    } else if (Array.from(newSelection).length === 0 && products) {
      const currentPageKeys = products.data.map((product) => product._id);

      setSelectedKeys((prevKeys) => {
        const updatedKeys = new Set(prevKeys);
        currentPageKeys.forEach((key) => updatedKeys.delete(key));
        return updatedKeys;
      });
    } else {
      setSelectedKeys(newSelection);
    }
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
    (product: Product, columnKey: React.Key) => {
      const cellValue = product[`${columnKey}`];

      switch (columnKey) {
        case "logo":
          return (
            <User
              avatarProps={{
                radius: "md",
                src: cellValue,
              }}
              name={""}
              classNames={{
                description: "text-sm",
              }}
              className="justify-start text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {product.name}
            </User>
          );
        case "name":
          return (
            <div className="flex flex-col gap-1 min-w-[230px]">
              <p className="font-semibold">{product.name}</p>
            </div>
          );
        case "is_active":
          return (
            <Chip
              variant="flat"
              color={product.is_active ? "success" : "danger"}
            >
              {product.is_active ? "Active" : "Disabled"}
            </Chip>
          );
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
                    build_path(URLs.store.products.get_id, {
                      id: product._id,
                    })
                  )}
                  isIconOnly
                  size="sm"
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-transparent p-0 flex items-center justify-center"
                >
                  <EyeIcon />
                </Button>
              </Tooltip>

              <Tooltip color="danger" content="Delete Product">
                <Button
                  size="sm"
                  isIconOnly
                  className="text-lg text-danger cursor-pointer active:opacity-50 bg-transparent p-0 block"
                  onClick={() => deleteModal(product)}
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

  const deleteModal = (product: Product) => {
    onOpen();
    setSelectedProduct(product);
  };

  const deleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      setProcessing(true);
      const result = await API_PRODUCT.deleteProduct(selectedProduct._id);

      if (result.success) {
        getProducts();
        onOpenChange();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const serialize = createSerializer(searchParams);
      const request = serialize(query);

      const res = await API_PRODUCT.getAllProducts(request);

      setProducts(res);
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg);
        setError(err_msg as string);
      });
    } finally {
      setLoading(false);
    }
  };

  useDebounce(
    () => {
      getProducts();
    },
    [query.search],
    1200
  );

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.sortField, query.sortOrder]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <GeneralizedTable
          name="Product Table"
          emptyContent={`No products added yet!`}
          selectionMode="multiple"
          loading={loading}
          page={products.meta.page}
          total={products.meta.total_pages}
          setPage={(v) => setQuery({ page: v })}
          columns={headerColumns}
          data={products?.data}
          topContent={topContent}
          selectedKeys={selectedKeys}
          sortDescriptor={{
            column: query.sortField as any,
            direction: query.sortOrder as any,
          }}
          setSortDescriptor={onSortChange}
          setSelectedKeys={handleSelectionChange}
          renderCell={renderCell}
        />
      </div>

      <ModalInstance
        title={"Delete Product"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleClick={deleteProduct}
        loading={processing}
      >
        <div className="flex flex-col gap-1 w-full">
          <p>Are you sure you want to delete this product?</p>
          <p className="font-bold">{selectedProduct?.name}</p>
        </div>
      </ModalInstance>
    </>
  );
};

export default ProductsTable;
