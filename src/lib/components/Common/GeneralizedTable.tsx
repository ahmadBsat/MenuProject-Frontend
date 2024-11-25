/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useMemo } from "react";
import {
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  Spinner,
  Selection,
  SortDescriptor,
  SelectionMode,
  Button,
  Pagination,
} from "@nextui-org/react";

type TableColumn = {
  uid: string;
  name: string;
  sortable?: boolean;
  [key: string]: any;
};

type GeneralizedTableProps = {
  name: string;
  emptyContent?: string;
  loading: boolean;
  columns: TableColumn[];
  data: any[] | undefined; // You can use a generic type here if needed
  renderCell: (item: any, columnKey: React.Key) => JSX.Element;
  sortDescriptor?: SortDescriptor;
  setSortDescriptor?: (sortDescriptor: SortDescriptor) => void;
  topContent?: React.JSX.Element;
  bottomContent?: React.JSX.Element | undefined;
  setSelectedKeys?: (value: Selection) => void;
  showSelectionCheckboxes?: boolean;
  selectionMode?: SelectionMode;
  selectedKeys?: Selection;
  disabledKeys?: string[];
  setPage: (val: number) => void;
  page: number;
  total: number;
};

const GeneralizedTable = ({
  name = "",
  loading,
  columns,
  data,
  total,
  page,
  setPage,
  renderCell,
  sortDescriptor,
  setSortDescriptor,
  topContent,
  selectedKeys,
  setSelectedKeys,
  emptyContent = "",
  selectionMode = "single",
  showSelectionCheckboxes = true,
  disabledKeys = [],
}: GeneralizedTableProps) => {
  const classNames = React.useMemo(
    () => ({
      table: loading ? "min-h-[420px]" : "h-full",
      wrapper: ["max-h-full", "max-w-full px-0 bg-transparent"],
      th: ["bg-transparent", "text-default-500", "border-y", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
      tr: ["border-b dark:border-white/20", "data-[disabled=true]:opacity-70"],
    }),
    [loading]
  );

  const onNextPage = useCallback(() => {
    if (page < total) {
      setPage(page + 1);
    }
  }, [page, setPage, total]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-4 flex w-full justify-center sm:justify-between items-center">
        <div className="hidden sm:flex w-[30%]"></div>

        {total !== 0 && (
          <Pagination
            // isCompact
            showControls={true}
            showShadow={false}
            color="primary"
            isDisabled={total === 0}
            page={page}
            total={total}
            onChange={(val) => setPage(val)}
            className="max-sm:w-full flex justify-center"
            classNames={{
              item: "bg-background",
            }}
          />
        )}

        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={total === 1 || total === 0}
            size="sm"
            variant="flat"
            onClick={onPreviousPage}
          >
            Previous
          </Button>

          <Button
            isDisabled={total === 1 || total === 0}
            size="sm"
            variant="flat"
            onClick={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [total, page, onPreviousPage, onNextPage, setPage]);

  return (
    <Table
      // isStriped
      // isCompact
      // removeWrapper
      aria-label={name}
      bottomContent={bottomContent}
      topContent={topContent}
      selectionMode={selectionMode}
      disabledKeys={disabledKeys}
      color="primary"
      sortDescriptor={sortDescriptor}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      shadow="none"
      showSelectionCheckboxes={showSelectionCheckboxes}
      radius="none"
      topContentPlacement="inside"
      bottomContentPlacement="inside"
      classNames={classNames}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
            className="uppercase"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={!loading ? emptyContent : ""}
        items={data ?? []}
        loadingContent={<Spinner color="primary" />}
        loadingState={loading ? "loading" : "idle"}
        isLoading={loading}
      >
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell className="font-medium">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default GeneralizedTable;
