/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { OrganizationMember } from "@/lib/types/organization";
import GeneralizedTable from "../../../Common/GeneralizedTable";
import {
  createSerializer,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import {
  Button,
  Chip,
  SortDescriptor,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { API_ORGANIZATION } from "@/lib/services/organization/organization_service";
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse } from "@/lib/types/common";
import { formatDates } from "@/utils/common";
import { EyeIcon } from "@/utils/icons";
import { MEMBERS_COLUMNS } from "@/lib/constants/tables";
import { LanguageParams } from "@/lib/types/page";
import { PlusIcon } from "@heroicons/react/20/solid";
import OrganizationInviteModal from "./OrganizationInviteModal";
import OrganizationMemberDrawer from "./OrganizationMember";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const OrganizationTeam = ({ lang }: LanguageParams) => {
  const searchParams = {
    page: parseAsInteger,
    limit: parseAsString,
    sortField: parseAsString,
    sortOrder: parseAsString,
  };

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [selected, setSelected] = useState<OrganizationMember | null>(null);
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSortChange = (sort: SortDescriptor) => {
    const temp = {
      sortField: sort.column as string,
      sortOrder: sort.direction as string,
    };

    setQuery({ ...temp });
  };

  const renderCell = useCallback(
    (member: OrganizationMember, columnKey: React.Key) => {
      const cellValue = member[`${columnKey}`];

      switch (columnKey) {
        case "public_name":
          return (
            <User
              avatarProps={{
                radius: "md",
                src: member.avatar,
              }}
              name={cellValue}
              className="justify-start text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {member.public_name}
            </User>
          );
        case "role":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={member.role === "owner" ? "danger" : "success"}
              className="capitalize font-bold text-sm"
            >
              {member.role}
            </Chip>
          );
        case "user":
          return member.user.email;
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
                    setSelected(member);
                    setVisible(true);
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
    []
  );

  const getOrganizationMembers = async () => {
    try {
      setLoading(true);
      const serialize = createSerializer(searchParams);
      const request = serialize(query);

      const result = await API_ORGANIZATION.getOrganizationMembers(
        organization,
        request
      );

      setMembers(result);
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(msg);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganizationMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization]);

  //todo: add meta from backend

  return (
    <div  className="flex flex-col gap-4 w-full max-w-4xl">
      <div className="w-full p-4 flex items-center justify-between gap-2 leading-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm sm:text-base">Add Team Members</p>

          <p className="text-xs sm:text-sm">
            Send invitations to grow your organization team!
          </p>
        </div>

        <Button
          size="sm"
          isIconOnly
          radius="md"
          color="primary"
          variant="flat"
          onClick={onOpen}
        >
          <PlusIcon className="size-5" />
        </Button>
      </div>

      <GeneralizedTable
        name="Members Table"
        emptyContent="No members yet!"
        selectionMode="multiple"
        loading={loading}
        page={1}
        total={1}
        setPage={console.log}
        columns={MEMBERS_COLUMNS}
        data={members}
        sortDescriptor={{
          column: query.sortField as any,
          direction: query.sortOrder as any,
        }}
        setSortDescriptor={onSortChange}
        renderCell={renderCell}
      />

      <OrganizationInviteModal isOpen={isOpen} onOpenChange={onOpenChange} />

      {selected && (
        <OrganizationMemberDrawer
          isOpen={visible}
          
          setIsOpen={setVisible}
          member={selected}
          organization={organization}
          callback={getOrganizationMembers}
        />
      )}
    </div>
  );
};

export default OrganizationTeam;
