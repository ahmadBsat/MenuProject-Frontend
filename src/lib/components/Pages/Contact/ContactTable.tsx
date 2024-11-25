/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { INITIAL_META } from "@/lib/constants/initials";
import GeneralizedTable from "../../Common/GeneralizedTable";
import {
  createSerializer,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { Button, SortDescriptor, Tooltip, User } from "@nextui-org/react";
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse } from "@/lib/types/common";
import { formatDates } from "@/utils/common";
import { EyeIcon } from "@/utils/icons";
import { CONTACT_ORG_COLUMNS } from "@/lib/constants/tables";
import type {
  ContactOrganization,
  ContactOrganizationTable,
} from "@/lib/types/contact";
import { API_CONTACT } from "@/lib/services/contact/contact_service";
import { LanguageParams } from "@/lib/types/page";
import ContactDrawer from "./ContactDrawer";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const ContactTablePage = ({ lang }: LanguageParams) => {
  const searchParams = {
    page: parseAsInteger,
    limit: parseAsString,
    sortField: parseAsString,
    sortOrder: parseAsString,
  };

  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selected, setSelected] = useState<ContactOrganization | null>(null);
  const [contacts, setContacts] = useState<ContactOrganizationTable>({
    data: [],
    meta: INITIAL_META,
  });
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

  const params = useParams();
  const organization = params.organization as string;

  const onSortChange = (sort: SortDescriptor) => {
    const temp = {
      sortField: sort.column as string,
      sortOrder: sort.direction as string,
    };

    setQuery({ ...temp });
  };

  const renderCell = useCallback(
    (record: ContactOrganization, columnKey: React.Key) => {
      const cellValue = record[`${columnKey}`];

      switch (columnKey) {
        case "avatar":
          return (
            <User
              avatarProps={{
                radius: "md",
                src: record.avatar,
              }}
              name={record.contact.name}
              description={record.contact.email}
              className="justify-start text-ellipsis overflow-hidden whitespace-nowrap"
              classNames={{ description: "text-sm" }}
            >
              {record.contact.name}
            </User>
          );
        case "contact.phone":
          return <div>{record.contact.phone || "No Phone"}</div>;
        // case "variables":
        //   return <div>{Object.keys(record.variables).length}</div>;
        case "createdAt":
          return formatDates(cellValue);
        case "updatedAt":
          return formatDates(cellValue);
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip color="primary" content="Details">
                <Button
                  isIconOnly
                  size="sm"
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-transparent p-0 flex items-center justify-center"
                  onClick={() => {
                    setSelected(record);
                    setIsOpen(true);
                  }}
                >
                  <EyeIcon />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contacts.data]
  );

  const getOrganizationContacts = async () => {
    try {
      setLoading(true);
      const serialize = createSerializer(searchParams);
      const request = serialize(query);

      const res = await API_CONTACT.getOrganizationContacts(
        organization,
        request
      );

      setContacts(res);
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg);
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCallback = (val: ContactOrganization) => {
    const updated_contact = contacts.data.find((c) => c._id === val._id);

    if (!updated_contact) return;

    updated_contact["variables"] = val["variables"];

    const temp = contacts.data.map((contact) =>
      contact._id === val._id ? updated_contact : contact
    );

    setContacts({ ...contacts, data: temp });
  };

  useEffect(() => {
    getOrganizationContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization]);

  return (
    <div className="flex flex-col gap-4 w-full relative">
      <GeneralizedTable
        name="Contact Table"
        emptyContent="No contacts yet!"
        selectionMode="multiple"
        loading={loading}
        page={contacts.meta.page}
        total={contacts.meta.total_pages}
        setPage={(v) => setQuery({ page: v })}
        columns={CONTACT_ORG_COLUMNS}
        data={contacts?.data}
        sortDescriptor={{
          column: query.sortField as any,
          direction: query.sortOrder as any,
        }}
        setSortDescriptor={onSortChange}
        renderCell={renderCell}
      />

      {selected && (
        <ContactDrawer
          organization={organization}
          contact={selected}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          callback={updateCallback}
        />
      )}
    </div>
  );
};

export default ContactTablePage;
