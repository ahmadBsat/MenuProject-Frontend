/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  SortDescriptor,
  Selection,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DeleteIcon, EyeIcon } from "@/utils/icons";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import ModalInstance from "@/lib/components/Modal/Modal";
import { getUrl, URLs } from "@/lib/constants/urls";
import { INPUT_STYLE } from "@/lib/constants/style";
import { INITIAL_META } from "@/lib/constants/initials";
import {
  ACTION_COLUMNS,
  ACTION_STATUS_OPTION,
  ACTION_VISIBLE_COL,
} from "@/lib/constants/tables";
import { build_path, formatDates } from "@/utils/common";
import {
  createSerializer,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import useDebounce from "@/lib/hooks/debounce";
import GeneralizedTable from "../../Common/GeneralizedTable";
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse } from "@/lib/types/common";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Store, StoreTable } from "@/lib/types/store/store";
import { API_STORE } from "@/lib/services/store/store_service";

const StoresTable = () => {
  const searchParams = {
    page: parseAsInteger,
    limit: parseAsString,
    search: parseAsString,
    sortField: parseAsString,
    sortOrder: parseAsString,
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [stores, setStores] = useState<StoreTable>({
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
    new Set(ACTION_VISIBLE_COL)
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [status, setStatus] = useState<Selection>("all");

  const params = useParams();
  const hasSearchFilter = Boolean(query.search);
  const agent_id = params.id as string;
  const organization = params.organization as string;

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return ACTION_COLUMNS;

    return ACTION_COLUMNS.filter((column) =>
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
    if (newSelection === "all" && stores) {
      const currentPageKeys = stores.data.map((store) => store._id);

      setSelectedKeys((prevKeys) => {
        const updatedKeys = new Set(prevKeys);
        currentPageKeys.forEach((key) => updatedKeys.add(key));
        return updatedKeys;
      });
    } else if (Array.from(newSelection).length === 0 && stores) {
      const currentPageKeys = stores.data.map((store) => store._id);

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

          <div className="flex gap-1 sm:gap-3">
            <Dropdown>
              <DropdownTrigger className="flex">
                <Button
                  endContent={<IoIosArrowDown className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={status}
                selectionMode="multiple"
                onSelectionChange={(keys) => setStatus(keys)}
              >
                {ACTION_STATUS_OPTION.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger className="flex">
                <Button
                  endContent={<IoIosArrowDown className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {ACTION_COLUMNS.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.search, onSearchChange, status, visibleColumns, onClear]);

  const renderCell = useCallback(
    (store: Store, columnKey: React.Key) => {
      const cellValue = store[`${columnKey}`];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col gap-1 min-w-[230px]">
              <p className="font-semibold">{store.name}</p>
            </div>
          );

        case "createdAt":
          return formatDates(cellValue);
        case "updatedAt":
          return formatDates(cellValue);
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="primary" content="Details">
                <Button
                  as={Link}
                  href={getUrl(
                    build_path(URLs.admin.stores.get_id, {
                      store_id: store._id,
                    })
                  )}
                  isIconOnly
                  size="sm"
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-transparent p-0 flex items-center justify-center"
                >
                  <EyeIcon />
                </Button>
              </Tooltip>

              <Tooltip color="danger" content="Delete Store">
                <Button
                  size="sm"
                  isIconOnly
                  className="text-lg text-danger cursor-pointer active:opacity-50 bg-transparent p-0 block"
                  onClick={() => deleteModal(store)}
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

  const deleteModal = (store: Store) => {
    onOpen();
    setSelectedStore(store);
  };

  const deleteStore = async () => {
    if (!selectedStore || !organization) return;

    try {
      setProcessing(true);
      const result = await API_STORE.deleteStore(selectedStore._id);

      if (result.success) {
        getStores();
        onOpenChange();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  const getStores = async () => {
    try {
      setLoading(true);
      const serialize = createSerializer(searchParams);
      const request = serialize(query);

      const res = await API_STORE.getAllStores(request);

      setStores(res);
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
      getStores();
    },
    [query.search],
    1200
  );

  useEffect(() => {
    getStores();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.sortField, query.sortOrder, agent_id, organization]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center w-full pt-2 justify-between gap-2">
          <div></div>

          <div className="flex items-center gap-2">
            <Button
              as={Link}
              variant="flat"
              color="primary"
              href={getUrl(URLs.admin.stores.create)}
            >
              Add
            </Button>
          </div>
        </div>

        <GeneralizedTable
          name="Store Table"
          emptyContent={`No stores added yet!`}
          selectionMode="multiple"
          loading={loading}
          page={stores.meta.page}
          total={stores.meta.total_pages}
          setPage={(v) => setQuery({ page: v })}
          columns={headerColumns}
          data={stores?.data}
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
        title={"Delete Store"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleClick={deleteStore}
        loading={processing}
      >
        <div className="flex flex-col gap-1 w-full">
          <p>Are you sure you want to delete this store?</p>
          <p className="font-bold">{selectedStore?.name}</p>
        </div>
      </ModalInstance>
    </>
  );
};

export default StoresTable;
