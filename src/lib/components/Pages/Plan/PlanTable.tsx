/* eslint-disable no-case-declarations */
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
import { DeleteIcon, EditIcon, EyeIcon } from "@/utils/icons";
import { AiOutlineSearch } from "react-icons/ai";
import ModalInstance from "@/lib/components/Modal/Modal";
import { getUrl, URLs } from "@/lib/constants/urls";
import { INPUT_STYLE } from "@/lib/constants/style";
import { INITIAL_META } from "@/lib/constants/initials";
import { PLANS_VISIBLE_COL, PLANS_COLUMNS } from "@/lib/constants/tables";
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
import { toast } from "sonner";
import { Store, StoreTable } from "@/lib/types/store/store";
import { API_STORE } from "@/lib/services/store/store_service";

const PlansTable = () => {
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
      sortField: parseAsString.withDefault("createdAt"),
      sortOrder: parseAsString.withDefault("ascending"),
    },
    {
      history: "push",
    }
  );
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(PLANS_VISIBLE_COL)
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [status, setStatus] = useState<Selection>("all");

  const getRenewal = () => {
    if (!selectedStore) return null;

    const renewal = new Date(selectedStore?.renewal_date);
    renewal.setMonth(renewal.getMonth() + 1);

    return renewal;
  };

  const renewal = getRenewal();

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return PLANS_COLUMNS;

    return PLANS_COLUMNS.filter((column) =>
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
        case "domain":
          return (
            <div className="flex flex-col gap-1 min-w-[230px]">
              <p className="font-semibold">{`fmcshops.com/${store.domain}`}</p>
            </div>
          );
        case "is_active":
          return (
            <Chip variant="flat" color={store.is_active ? "success" : "danger"}>
              {store.is_active ? "Active" : "Disabled"}
            </Chip>
          );

        case "renewal_date":
          return formatDates(store.renewal_date);

        case "renewal_cost":
          return (
            <span className="text-default-600">${store.renewal_cost}</span>
          );

        case "renewal_status":
          const today = new Date();
          const renewal_date = new Date(store.renewal_date);

          const days_diff = Math.ceil(
            (renewal_date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );

          let chip_color = "success"; // Default green
          let status_message = "Active";

          if (days_diff <= 3) {
            chip_color = "danger"; // Red for due in 3 days or less
            status_message = "Due Soon";
          } else if (days_diff <= 7) {
            chip_color = "warning"; // Yellow for due in a week or less
            status_message = "Expiring Soon";
          }

          return (
            <Chip variant="flat" color={chip_color as any}>
              {status_message}
            </Chip>
          );

        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip color="primary" content="Details">
                <Button
                  isIconOnly
                  size="sm"
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-transparent p-0 flex items-center justify-center"
                  onClick={() => {
                    setSelectedStore(store);
                    onOpen();
                  }}
                >
                  <EditIcon />
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

  const updateRenewal = async () => {
    if (!selectedStore) return;

    try {
      setProcessing(true);
      const result = await API_STORE.renewPlan(selectedStore._id);

      if (result.success) {
        getStores();
        onOpenChange();
      }
    } catch (error) {
      handleServerError(error, (msg) => {
        toast.error(`${msg}`);
      });
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
  }, [query.page, query.sortField, query.sortOrder]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
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
        title={"Renew Store Plan"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleClick={updateRenewal}
        loading={processing}
      >
        <div className="flex flex-col gap-1 w-full">
          <p>Are you sure you want to renew this store plan?</p>
          <p>
            Next renewal for{" "}
            <span className="font-bold">{selectedStore?.name}</span> will be at{" "}
            <span className="font-bold">
              {renewal ? formatDates(renewal.toISOString()) : ""}
            </span>
          </p>
        </div>
      </ModalInstance>
    </>
  );
};

export default PlansTable;
