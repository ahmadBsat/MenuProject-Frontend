"use client";

import { Button, Divider, Input } from "@nextui-org/react";
import Drawer, {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from "../../Common/Drawer/Drawer";
import { ContactOrganization } from "@/lib/types/contact";
import { FormEvent, useEffect, useState } from "react";
import { set } from "lodash";
import { API_CONTACT } from "@/lib/services/contact/contact_service";
import { handleServerError } from "@/lib/api/_axios";
import { ErrorResponse } from "@/lib/types/common";
import { DeleteIcon } from "@/utils/icons";
import { toast } from "sonner";

type ContactDrawerProps = {
  organization: string;
  contact: ContactOrganization;
  isOpen: boolean;
  callback: (val: ContactOrganization) => void;
  setIsOpen: (val: boolean) => void;
};

const ContactDrawer = ({
  contact,
  organization,
  isOpen,
  setIsOpen,
  callback,
}: ContactDrawerProps) => {
  const [data, setData] = useState(contact);
  const [record, setRecord] = useState({ key: "", value: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    const temp = { ...record };
    set(temp, field, value);
    setRecord(temp);
  };

  const addRecord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!record.key || !record.value) return;

    const temp = { ...data };
    temp["variables"][record.key] = JSON.stringify(record.value);

    setData(temp);
    setRecord({ key: "", value: "" });
  };

  const deleteRecord = (key: string) => {
    const temp = { ...data };
    delete temp["variables"][key];

    setData(temp);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await API_CONTACT.updateOrganizationContact(
        contact._id,
        organization,
        data
      );

      toast.success(res.message);

      callback(data);
    } catch (error) {
      handleServerError(error as ErrorResponse, (msg) => {
        toast.error(msg);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData(contact);
  }, [contact]);

  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
      <DrawerHeader className="flex flex-col items-start mt-3">
        <p className="text-2xl mb-6 text-primary">Contact</p>
        <p className="text-lg">{contact.contact.name}</p>{" "}
        <p className="text-lg">{contact.contact.phone || "No phone number"}</p>
        <p className="text-lg">{contact.contact.email}</p>
        <Divider className="mt-12 mb-8" />
      </DrawerHeader>

      <DrawerBody className="flex flex-col gap-2">
        <div className="text-2xl text-primary">Custom Contact Data</div>

        <form
          onSubmit={(e) => addRecord(e)}
          className="flex items-center gap-2"
        >
          <Input
            required
            isRequired
            name="key"
            placeholder="Key name"
            variant="underlined"
            value={record.key}
            onValueChange={(v) => handleChange("key", v)}
          />

          <Input
            required
            isRequired
            name="value"
            placeholder="Key value"
            variant="underlined"
            value={record.value}
            onValueChange={(v) => handleChange("value", v)}
          />

          <Button type="submit" size="sm" color="primary" variant="flat">
            Add
          </Button>
        </form>

        <div className="mt-5">
          <p className="text-lg mb-2">Current data</p>
          <ul className="list-disc pl-5">
            {Object.entries(data.variables).map(([key, value]) => (
              <li key={key}>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{key}: </span>
                  <span className="text-primary">{value.toString()}</span>
                  <Button
                    isIconOnly
                    size="sm"
                    className="px-0 bg-transparent text-danger"
                    onClick={() => deleteRecord(key)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DrawerBody>

      <DrawerFooter className="justify-end flex flex-row gap-2">
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

export default ContactDrawer;
