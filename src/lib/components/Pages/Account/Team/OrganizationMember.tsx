"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Divider,
  Input,
  Select,
  SelectItem,
  TimeInput,
  cn,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { set } from "lodash";
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse, NestedKeyOf } from "@/lib/types/common";
import { OrganizationMember } from "@/lib/types/organization";
import Drawer, {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from "@/lib/components/Common/Drawer/Drawer";
import { API_ORGANIZATION } from "@/lib/services/organization/organization_service";
import AccountAvatar from "../AccountAvatar";
import { DeleteIcon } from "@/utils/icons";
import { AVAILABILITY_INITIAL } from "@/lib/constants/initials";
import { Time } from "@internationalized/date";
import {
  IANA_TIMEZONES,
  PERMISSIONS,
  ROLES,
  TIMEZONES,
  USER_ROLES,
} from "@/lib/constants/variables";
import { useOrganization } from "@/store/organization";
import { ADMIN_NAVIGATION } from "@/lib/constants/menu";
import { useTranslation } from "@/lib/i18n/client";
import { LanguageParams } from "@/lib/types/page";
import { toast } from "sonner";

type ContactDrawerProps = {
  organization: string;
  member: OrganizationMember;
  isOpen: boolean;
  callback: () => void;
  setIsOpen: (val: boolean) => void;
} & LanguageParams;

const OrganizationMemberDrawer = ({
  member,
  organization,
  lang,
  isOpen,
  setIsOpen,
  callback,
}: ContactDrawerProps) => {
  const [data, setData] = useState(member);
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState("");
  const [access, setAccess] = useState({ permission: "", page_key: "" });

  const { t } = useTranslation(lang, "panel");
  const {
    clearance: { role, _id },
  } = useOrganization();

  const pages = ADMIN_NAVIGATION.map((m) => m.data)
    .map((x) => x)
    .flat(1);

  const handleChange = (
    field: NestedKeyOf<OrganizationMember>,
    value: boolean | string | string[]
  ) => {
    const temp = { ...data };
    set(temp, field, value);
    setData(temp);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await API_ORGANIZATION.updateOrganizationMemberById(
        organization,
        member._id,
        data
      );

      toast.success(res.message);

      callback();
      setIsOpen(false);
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(msg);
      });
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (!skill) return;

    const temp = { ...data };
    temp.skills.push(skill);
    setData(temp);
    setSkill("");
  };

  const removeSkill = (idx: number) => {
    const temp = [...data.skills];
    temp.splice(idx, 1);

    handleChange("skills", temp);
  };

  const addAccess = () => {
    if (!access.page_key || !access.permission) return;

    const temp = { ...data };
    temp.access.push(access);
    setData(temp);
    setAccess({ page_key: "", permission: "" });
  };

  useEffect(() => {
    if (member.availability.length === 0) {
      setData({
        ...member,
        availability: AVAILABILITY_INITIAL,
        timezone: "(UTC+00:00) Coordinated Universal Time",
      });
    } else {
      setData(member);
    }
  }, [member]);

  return (
    <Drawer isOpen={Boolean(isOpen && member)} setIsOpen={setIsOpen}>
      <DrawerHeader className="flex flex-col items-start mt-3">
        <p className="text-2xl mb-6 flex gap-1">
          Organization
          <span className="text-primary capitalize">{member.role}</span>
        </p>
        <p className="text-lg">
          {member.user.firstname} {member.user.lastname}
        </p>
        <p className="text-lg">{member.user.email}</p>
        <Divider className="mt-12 mb-8" />
      </DrawerHeader>

      <DrawerBody className="flex flex-col items-start gap-2">
        <div className="text-xl text-primary">User Public Data</div>

        <AccountAvatar handleChange={handleChange} avatar={data.avatar} />

        <Input
          required
          isRequired
          name="public_name"
          aria-label="Public name"
          placeholder="Public name"
          value={data.public_name}
          variant="underlined"
          onValueChange={(v) => handleChange("public_name", v)}
        />

        <div className="text-xl text-primary mt-4">User Role</div>

        <Select
          variant="underlined"
          items={ROLES}
          isDisabled={
            (role === USER_ROLES.OWNER && member._id === _id) ||
            role === USER_ROLES.EMPLOYEE
          }
          // disabledKeys={}
          aria-label="User Role"
          placeholder="Select a role"
          className="max-w-full"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={new Set([data.role])}
          onSelectionChange={(v) =>
            handleChange("role", Array.from(v)[0].toString())
          }
        >
          {(role) => (
            <SelectItem key={role.value} textValue={role.name}>
              <div className="flex flex-col">
                <span className="text-small">{role.name}</span>
                <span className="text-tiny text-default-400">
                  {role.description}
                </span>
              </div>
            </SelectItem>
          )}
        </Select>

        <div className="text-xl text-primary mt-4">User Skills</div>

        <div className="flex w-full items-center gap-4 justify-between mt-2">
          <Input
            required
            isRequired
            name="skill"
            aria-label="Skill"
            placeholder="Skill"
            value={skill}
            variant="underlined"
            onValueChange={setSkill}
            endContent={
              <Button
                size="sm"
                color="primary"
                variant="flat"
                onClick={addSkill}
              >
                Add
              </Button>
            }
          />
        </div>

        <ul className="list-disc pl-5 mt-2">
          {data.skills.map((item, idx) => {
            return (
              <li key={idx}>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{item} </span>

                  <Button
                    isIconOnly
                    size="sm"
                    className="px-0 bg-transparent text-danger"
                    onClick={() => removeSkill(idx)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="text-xl text-primary mt-4">User Availability</div>

        <div className="flex flex-col gap-4 w-full">
          <Autocomplete
            label="Timezone"
            placeholder="Timezone"
            required
            isRequired
            variant="underlined"
            selectedKey={data.timezone}
            onSelectionChange={(e) =>
              handleChange("timezone", e?.toString() || "")
            }
            className="mb-2"
          >
            {IANA_TIMEZONES.map((timezone, idx) => {
              return (
                <AutocompleteItem key={timezone}>
                  {TIMEZONES[idx]}
                </AutocompleteItem>
              );
            })}
          </Autocomplete>

          {data.availability.map((item, idx) => {
            const start_time = item?.start_time?.split(":") || [0, 0, 0];
            const end_time = item?.end_time?.split(":") || [0, 0, 0];

            return (
              <div
                key={idx}
                className={cn(
                  !item.is_available && "opacity-50",
                  "flex flex-col gap-2 w-full"
                )}
              >
                <div className="flex items-center gap-1 w-full px-1">
                  <p className="capitalize w-[85px]">{item.day}</p>
                  <Checkbox
                    isSelected={item.is_available}
                    onValueChange={(v) =>
                      handleChange(`availability[${idx}].is_available`, v)
                    }
                  >
                    Is Available
                  </Checkbox>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <TimeInput
                    size="sm"
                    label="Start Time"
                    // hourCycle={24}
                    value={
                      new Time(
                        Number(start_time[0]),
                        Number(start_time[1]),
                        Number(start_time[2])
                      )
                    }
                    onChange={(v) =>
                      handleChange(
                        `availability[${idx}].start_time`,
                        v.toString()
                      )
                    }
                  />

                  <TimeInput
                    size="sm"
                    label="End Time"
                    // hourCycle={24}
                    value={
                      new Time(
                        Number(end_time[0]),
                        Number(end_time[1]),
                        Number(end_time[2])
                      )
                    }
                    onChange={(v) =>
                      handleChange(
                        `availability[${idx}].end_time`,
                        v.toString()
                      )
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        {_id !== member._id &&
          (role === USER_ROLES.ADMIN || role === USER_ROLES.OWNER) && (
            <>
              <div className="text-xl text-primary mt-4">User Access</div>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Select
                    variant="underlined"
                    items={pages}
                    disabledKeys={data.access.map((k) => k.page_key)}
                    aria-label="Page Access"
                    placeholder="Select a page"
                    className="max-w-full"
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={new Set([access.page_key])}
                    onSelectionChange={(v) =>
                      setAccess({
                        permission: access.permission,
                        page_key: Array.from(v)[0].toString(),
                      })
                    }
                  >
                    {(page) => (
                      <SelectItem key={page.key} textValue={t(page.name)}>
                        <div className="flex flex-col">
                          <span className="text-small">{t(page.name)}</span>
                        </div>
                      </SelectItem>
                    )}
                  </Select>

                  <Select
                    variant="underlined"
                    aria-label="Permission"
                    placeholder="Select page permission"
                    className="max-w-full"
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={new Set([access.permission])}
                    onSelectionChange={(v) =>
                      setAccess({
                        page_key: access.page_key,
                        permission: Array.from(v)[0].toString(),
                      })
                    }
                    classNames={{ innerWrapper: "capitalize" }}
                  >
                    {PERMISSIONS.map((permission) => {
                      return (
                        <SelectItem
                          key={permission}
                          textValue={permission}
                          className="capitalize"
                        >
                          {permission}
                        </SelectItem>
                      );
                    })}
                  </Select>

                  <Button
                    color="primary"
                    size="sm"
                    variant="flat"
                    onClick={addAccess}
                  >
                    Add
                  </Button>
                </div>

                {data.access.map((item, idx) => {
                  return (
                    <div key={idx} className="flex flex-col gap-1">
                      <p className="text-lg">{t(item.page_key)}</p>

                      <div className="flex items-center gap-4">
                        <Select
                          variant="underlined"
                          aria-label="Permission"
                          placeholder="Select page permission"
                          className="max-w-full"
                          selectionMode="single"
                          disallowEmptySelection
                          selectedKeys={new Set([item.permission])}
                          onSelectionChange={(v) => {
                            handleChange(
                              `access[${idx}].permission`,
                              Array.from(v)[0].toString()
                            );
                          }}
                          classNames={{ innerWrapper: "capitalize" }}
                        >
                          {PERMISSIONS.map((permission) => {
                            return (
                              <SelectItem
                                key={permission}
                                textValue={permission}
                                className="capitalize"
                              >
                                {permission}
                              </SelectItem>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
      </DrawerBody>

      <DrawerFooter className="justify-end flex flex-row gap-2 pt-8">
        <Button
          isDisabled={loading}
          color="danger"
          variant="flat"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>

        <Button
          isLoading={loading}
          color="success"
          variant="flat"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </DrawerFooter>
    </Drawer>
  );
};

export default OrganizationMemberDrawer;
