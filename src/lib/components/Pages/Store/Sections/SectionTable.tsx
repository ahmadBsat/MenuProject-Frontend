/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { handleServerError } from "@/lib/api/_axios";
import ModalInstance from "@/lib/components/Modal/Modal";
import { INITIAL_META } from "@/lib/constants/initials";
import { INPUT_STYLE } from "@/lib/constants/style";
import { SECTIONS_COLUMNS, SECTIONS_VISIBLE_COL } from "@/lib/constants/tables";
import { getUrl, URLs } from "@/lib/constants/urls";
import useDebounce from "@/lib/hooks/debounce";
import { API_SECTION } from "@/lib/services/store/section_service";
import { ErrorResponse } from "@/lib/types/common";
import { Section, SectionTable } from "@/lib/types/store/section";
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

const SectionsTable = () => {
  const searchParams = {
    page: parseAsInteger,
    limit: parseAsString,
    search: parseAsString,
    sortField: parseAsString,
    sortOrder: parseAsString,
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [sections, setSections] = useState<SectionTable>({
    data: [],
    meta: INITIAL_META,
  });
  const [allSections, setAllSections] = useState<Section[]>([]); // Store all data for client-side filtering
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
    new Set(SECTIONS_VISIBLE_COL)
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [status, setStatus] = useState<Selection>("all");

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return SECTIONS_COLUMNS;

    return SECTIONS_COLUMNS.filter((column) =>
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
    if (newSelection === "all" && sections) {
      const currentPageKeys = sections.data.map((section) => section._id);

      setSelectedKeys((prevKeys) => {
        const updatedKeys = new Set(prevKeys);
        currentPageKeys.forEach((key) => updatedKeys.add(key));
        return updatedKeys;
      });
    } else if (Array.from(newSelection).length === 0 && sections) {
      const currentPageKeys = sections.data.map((section) => section._id);

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
    (section: Section, columnKey: React.Key) => {
      const cellValue = section[`${columnKey}`];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <p className="text-default-500 font-semibold">
                  {cellValue}
                </p>
              </div>
            </div>
          );

        case "is_active":
          return (
            <Chip
              variant="flat"
              color={section.is_active ? "success" : "danger"}
            >
              {section.is_active ? "Active" : "Disabled"}
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
                    build_path(URLs.store.sections.get_id, {
                      id: section._id,
                    })
                  )}
                  isIconOnly
                  size="sm"
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-transparent p-0 flex items-center justify-center"
                >
                  <EyeIcon />
                </Button>
              </Tooltip>

              <Tooltip color="danger" content="Delete Section">
                <Button
                  size="sm"
                  isIconOnly
                  className="text-lg text-danger cursor-pointer active:opacity-50 bg-transparent p-0 block"
                  onClick={() => deleteModal(section)}
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

  const deleteModal = (section: Section) => {
    onOpen();
    setSelectedSection(section);
  };

  const deleteProduct = async () => {
    if (!selectedSection) return;

    try {
      setProcessing(true);
      const result = await API_SECTION.deleteSection(selectedSection._id);

      if (result.success) {
        getSections();
        onOpenChange();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  // Fetch all sections once on mount
  const getSections = async () => {
    try {
      setLoading(true);
      // Fetch all sections without pagination for client-side filtering
      const res = await API_SECTION.getAllSections();

      setAllSections(res.data);
      setSections(res);
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
  const filteredSections = useMemo(() => {
    let filtered = [...allSections];

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter((section) =>
        section.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply sorting
    if (query.sortField) {
      filtered.sort((a, b) => {
        const aValue = a[query.sortField as keyof Section];
        const bValue = b[query.sortField as keyof Section];

        if (aValue < bValue) return query.sortOrder === "ascending" ? -1 : 1;
        if (aValue > bValue) return query.sortOrder === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [allSections, searchValue, query.sortField, query.sortOrder]);

  // Client-side pagination
  const paginatedSections = useMemo(() => {
    const limit = parseInt(query.limit);
    const startIndex = (query.page - 1) * limit;
    const endIndex = startIndex + limit;

    return filteredSections.slice(startIndex, endIndex);
  }, [filteredSections, query.page, query.limit]);

  // Update sections state when filtered/paginated data changes
  useEffect(() => {
    const limit = parseInt(query.limit);
    const totalPages = Math.ceil(filteredSections.length / limit);

    setSections({
      data: paginatedSections,
      meta: {
        page: query.page,
        total_pages: totalPages,
        total_items: filteredSections.length,
        limit: limit,
      },
    });
  }, [paginatedSections, filteredSections, query.page, query.limit]);

  useEffect(() => {
    getSections();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <GeneralizedTable
          name="Section Table"
          emptyContent={`No sections added yet!`}
          selectionMode="multiple"
          loading={loading}
          page={sections.meta.page}
          total={sections.meta.total_pages}
          setPage={(v) => setQuery({ page: v })}
          columns={headerColumns}
          data={sections?.data}
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
        title={"Delete Section"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleClick={deleteProduct}
        loading={processing}
      >
        <div className="flex flex-col gap-1 w-full">
          <p>Are you sure you want to delete this section?</p>
        </div>
      </ModalInstance>
    </>
  );
};

export default SectionsTable;
