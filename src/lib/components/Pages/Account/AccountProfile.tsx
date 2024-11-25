"use client";

import { API_ORGANIZATION } from "@/lib/services/organization/organization_service";
import { Button, Input } from "@nextui-org/react";
import { set } from "lodash";
import { useEffect, useState } from "react";
import AccountAvatar from "./AccountAvatar";
import { useOrganization } from "@/store/organization";
import { useParams } from "next/navigation";

const AccountProfile = () => {
  const params = useParams();
  const organization = params.organization as string;
  const { clearance, setClearance } = useOrganization();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    public_name: clearance.public_name || "",
    avatar: clearance.avatar || "",
  });

  const handleChange = (field: string, value: string) => {
    const temp = { ...data };
    set(temp, field, value);
    setData(temp);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await API_ORGANIZATION.updateOrganizationMember(organization, data);
      setClearance({
        ...clearance,
        public_name: data.public_name,
        avatar: data.avatar,
      });
      setSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const is_changed =
      data.public_name !== clearance.public_name ||
      data.avatar !== clearance.avatar;

    if (is_changed) {
      setData({
        avatar: clearance.avatar || "",
        public_name: clearance.public_name || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearance]);

  return (
    <div className="flex flex-col w-full gap-6 sm:px-3 py-3 max-sm:pt-0">
      <AccountAvatar handleChange={handleChange} avatar={data.avatar} />

      <div className="flex flex-col">
        <p className="text-base font-medium text-default-700 px-1">
          Public Name
        </p>
        <p className="mb-2 text-sm font-normal text-default-400 px-1">
          Name displayed for customers in the chatbot widget.
        </p>
        <Input
          aria-label={"Public Name"}
          placeholder={"e.g John"}
          size="md"
          radius="md"
          required
          isRequired
          value={data.public_name}
          onValueChange={(val) => handleChange("public_name", val)}
          className="max-w-2xl"
          classNames={{
            inputWrapper:
              "bg-white dark:bg-default-100 group-data-[focus=true]:bg-white dark:group-data-[focus=true]:bg-default-100",
          }}
        />
      </div>

      <div className="pt-2">
        <Button
          color={success ? "success" : "primary"}
          className="hover:bg-primary font-semibold hover:text-white"
          isLoading={loading}
          isDisabled={success}
          onClick={handleSubmit}
        >
          {success ? "Done" : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default AccountProfile;
