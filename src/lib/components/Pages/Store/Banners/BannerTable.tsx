/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { handleServerError } from "@/lib/api/_axios";
import ModalInstance from "@/lib/components/Modal/Modal";
import { INITIAL_META } from "@/lib/constants/initials";
import { INPUT_STYLE } from "@/lib/constants/style";
import { BANNERS_COLUMNS, BANNERS_VISIBLE_COL } from "@/lib/constants/tables";
import { getUrl, URLs } from "@/lib/constants/urls";
import useDebounce from "@/lib/hooks/debounce";
import { API_BANNER } from "@/lib/services/store/banner_service";
import { ErrorResponse } from "@/lib/types/common";
import { Banner, BannerTable } from "@/lib/types/store/banner";
import { build_path, formatDates } from "@/utils/common";
import { DeleteIcon, EyeIcon } from "@/utils/icons";
import {
  Avatar,
  Button,
  Chip,
  Input,
  Selection,
  SortDescriptor,
  Tooltip,
  useDisclosure,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import {
  createSerializer,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "sonner";
import GeneralizedTable from "../../../Common/GeneralizedTable";

const BannersTable = () => {
  const searchParams = {
    page: parseAsInteger,
    limit: parseAsString,
    search: parseAsString,
    sortField: parseAsString,
    sortOrder: parseAsString,
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [banners, setBanners] = useState<BannerTable>({
    data: [],
    meta: INITIAL_META,
  });
  const [allBanners, setAllBanners] = useState<Banner[]>([]); // Store all data for client-side filtering
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      limit: parseAsString.withDefault("25"),
      sortField: parseAsString.withDefault("createdAt"),
      sortOrder: parseAsString.withDefault("ascending"),
    },
    {
      history: "push",
    }
  );
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(BANNERS_VISIBLE_COL)
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [status, setStatus] = useState<Selection>("all");

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return BANNERS_COLUMNS;

    return BANNERS_COLUMNS.filter((column) =>
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

  const handleSelectionChange = (newSelection: Selection) => {
    if (newSelection === "all" && banners) {
      const currentPageKeys = banners.data.map((banner) => banner._id);

      setSelectedKeys((prevKeys) => {
        const updatedKeys = new Set(prevKeys);
        currentPageKeys.forEach((key) => updatedKeys.add(key));
        return updatedKeys;
      });
    } else if (Array.from(newSelection).length === 0 && banners) {
      const currentPageKeys = banners.data.map((banner) => banner._id);

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
            placeholder="Search by ID"
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
    (banner: Banner, columnKey: React.Key) => {
      const cellValue = banner[`${columnKey}`];

      switch (columnKey) {
        case "images":
          return (
            <Avatar
              size="md"
              src={banner.images.length > 0 ? banner.images[0] : ""}
            />
          );

        case "is_active":
          return (
            <Chip
              variant="flat"
              color={banner.is_active ? "success" : "danger"}
            >
              {banner.is_active ? "Active" : "Disabled"}
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
                    build_path(URLs.store.banners.get_id, {
                      id: banner._id,
                    })
                  )}
                  isIconOnly
                  size="sm"
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-transparent p-0 flex items-center justify-center"
                >
                  <EyeIcon />
                </Button>
              </Tooltip>

              <Tooltip color="danger" content="Delete Banner">
                <Button
                  size="sm"
                  isIconOnly
                  className="text-lg text-danger cursor-pointer active:opacity-50 bg-transparent p-0 block"
                  onClick={() => deleteModal(banner)}
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

  const deleteModal = (banner: Banner) => {
    onOpen();
    setSelectedBanner(banner);
  };

  const deleteProduct = async () => {
    if (!selectedBanner) return;

    try {
      setProcessing(true);
      const result = await API_BANNER.deleteBanner(selectedBanner._id);

      if (result.success) {
        getBanners();
        onOpenChange();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  // Fetch all banners once on mount
  const getBanners = async () => {
    try {
      setLoading(true);
      // Fetch all banners without pagination for client-side filtering
      const res = await API_BANNER.getAllBanners();

      setAllBanners(res.data);
      setBanners(res);
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg);
        setError(err_msg as string);
      });
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering and pagination
  const filteredBanners = useMemo(() => {
    let filtered = [...allBanners];

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter((banner) =>
        banner._id.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply sorting
    if (query.sortField) {
      filtered.sort((a, b) => {
        const aValue = a[query.sortField as keyof Banner];
        const bValue = b[query.sortField as keyof Banner];

        if (aValue < bValue) return query.sortOrder === "ascending" ? -1 : 1;
        if (aValue > bValue) return query.sortOrder === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [allBanners, searchValue, query.sortField, query.sortOrder]);

  // Client-side pagination
  const paginatedBanners = useMemo(() => {
    const limit = parseInt(query.limit);
    const startIndex = (query.page - 1) * limit;
    const endIndex = startIndex + limit;

    return filteredBanners.slice(startIndex, endIndex);
  }, [filteredBanners, query.page, query.limit]);

  // Update banners state when filtered/paginated data changes
  useEffect(() => {
    const limit = parseInt(query.limit);
    const totalPages = Math.ceil(filteredBanners.length / limit);

    setBanners({
      data: paginatedBanners,
      meta: {
        count: filteredBanners.length,
        page: query.page,
        limit: limit,
        total_pages: totalPages,
        has_next: query.page < totalPages,
        has_previous: query.page > 1,
      },
    });
  }, [paginatedBanners, filteredBanners, query.page, query.limit]);

  useEffect(() => {
    getBanners();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <GeneralizedTable
          name="Banner Table"
          emptyContent={`No banners added yet!`}
          selectionMode="multiple"
          loading={loading}
          page={banners.meta.page}
          total={banners.meta.total_pages}
          setPage={(v) => setQuery({ page: v })}
          columns={headerColumns}
          data={banners?.data}
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
        title={"Delete Banner"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleClick={deleteProduct}
        loading={processing}
      >
        <div className="flex flex-col gap-1 w-full">
          <p>Are you sure you want to delete this banner?</p>
        </div>
      </ModalInstance>
    </>
  );
};

export default BannersTable;
