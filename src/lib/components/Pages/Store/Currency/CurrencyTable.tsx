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
import { Currency, CurrencyTable } from "@/lib/types/store/currency";
import { API_CURRENCY } from "@/lib/services/store/currency_service";

const CurrenciesTable = () => {
  const searchParams = {
    page: parseAsInteger,
    limit: parseAsString,
    search: parseAsString,
    sortField: parseAsString,
    sortOrder: parseAsString,
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [currencies, setCurrencies] = useState<CurrencyTable>({
    data: [],
    meta: INITIAL_META,
  });
  const [allCurrencies, setAllCurrencies] = useState<Currency[]>([]); // Store all data for client-side filtering
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      limit: parseAsString.withDefault("25"),
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
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>();

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return BRANCH_COLUMNS;

    return BRANCH_COLUMNS.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const onSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setQuery({ page: 1 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClear = useCallback(() => {
    setSearchValue("");
    setQuery({ page: 1 });
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
            value={searchValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, onSearchChange, status, visibleColumns, onClear]);

  const renderCell = useCallback(
    (currency: Currency, columnKey: React.Key) => {
      const cellValue = currency[`${columnKey}`];

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
                    build_path(URLs.store.currencies.get_id, {
                      id: currency._id,
                    })
                  )}
                  isIconOnly
                  size="sm"
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-transparent p-0 flex items-center justify-center"
                >
                  <EyeIcon />
                </Button>
              </Tooltip>

              <Tooltip color="danger" content="Delete Currency">
                <Button
                  size="sm"
                  isIconOnly
                  className="text-lg text-danger cursor-pointer active:opacity-50 bg-transparent p-0 block"
                  onClick={() => deleteModal(currency)}
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

  const deleteModal = (currency: Currency) => {
    onOpen();
    setSelectedCurrency(currency);
  };

  const deleteCurrency = async () => {
    if (!selectedCurrency) return;

    try {
      setProcessing(true);
      const result = await API_CURRENCY.deleteCurrency(selectedCurrency._id);

      if (result.success) {
        getCurrencyes();
        onOpenChange();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  // Fetch all currencies once on mount
  const getCurrencyes = async () => {
    try {
      setLoading(true);
      // Fetch all currencies without pagination for client-side filtering
      const res = await API_CURRENCY.getAllCurrencies();

      setAllCurrencies(res.data);
      setCurrencies(res);
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg);
      });
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering and pagination
  const filteredCurrencies = useMemo(() => {
    let filtered = [...allCurrencies];

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter((currency) =>
        currency.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply sorting
    if (query.sortField) {
      filtered.sort((a, b) => {
        const aValue = a[query.sortField as keyof Currency];
        const bValue = b[query.sortField as keyof Currency];

        if (aValue < bValue) return query.sortOrder === "ascending" ? -1 : 1;
        if (aValue > bValue) return query.sortOrder === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [allCurrencies, searchValue, query.sortField, query.sortOrder]);

  // Client-side pagination
  const paginatedCurrencies = useMemo(() => {
    const limit = parseInt(query.limit);
    const startIndex = (query.page - 1) * limit;
    const endIndex = startIndex + limit;

    return filteredCurrencies.slice(startIndex, endIndex);
  }, [filteredCurrencies, query.page, query.limit]);

  // Update currencies state when filtered/paginated data changes
  useEffect(() => {
    const limit = parseInt(query.limit);
    const totalPages = Math.ceil(filteredCurrencies.length / limit);

    setCurrencies({
      data: paginatedCurrencies,
      meta: {
        page: query.page,
        total_pages: totalPages,
        total_items: filteredCurrencies.length,
        limit: limit,
      },
    });
  }, [paginatedCurrencies, filteredCurrencies, query.page, query.limit]);

  useEffect(() => {
    getCurrencyes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <GeneralizedTable
          name="Currency Table"
          emptyContent={`No currencies added yet!`}
          selectionMode="none"
          loading={loading}
          page={currencies.meta.page}
          total={currencies.meta.total_pages}
          setPage={(v) => setQuery({ page: v })}
          columns={headerColumns}
          data={currencies?.data}
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
        title={"Delete Currency"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleClick={deleteCurrency}
        loading={processing}
      >
        <div className="flex flex-col gap-1 w-full">
          <p>Are you sure you want to delete this currency?</p>
          <p className="font-bold">{selectedCurrency?.name}</p>
        </div>
      </ModalInstance>
    </>
  );
};

export default CurrenciesTable;
