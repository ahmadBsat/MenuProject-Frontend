"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Card,
  Input,
  Switch,
} from "@nextui-org/react";
import { CARD_STYLE, SWITCH_STYLE } from "@/lib/constants/style";
import { useEffect, useState } from "react";
import { User } from "@/lib/types/user/user";
import { handleServerError } from "@/lib/api/_axios";
import { toast } from "sonner";
import { API_USER } from "@/lib/services/user/user_service";
import { HexColorPicker } from "react-colorful";
import { StoreForm } from "@/lib/types/store/store";
import { NestedKeyOf } from "@/lib/types/common";

const StoreInformation = ({
  data,
  editable,
  handleChange,
}: {
  data: StoreForm;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (field: NestedKeyOf<StoreForm>, value: any) => void;
  editable: boolean;
}) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    setLoading(true);

    try {
      const res = await API_USER.getAllUsers();
      setUsers(res.data);
    } catch (error) {
      handleServerError(error, (msg) => {
        toast.error(`${msg}`);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <Card shadow="none" className={CARD_STYLE}>
        <div className="text-lg sm:text-xl px-1">Information</div>

        <div className="flex flex-col gap-4 w-full">
          <Input
            label="Name"
            type="text"
            placeholder="Descriptive name for the action..."
            isRequired
            required
            isDisabled={!editable}
            value={data.name}
            onValueChange={(e) => handleChange("name", e)}
          />

          <Input
            label="Domain"
            type="text"
            placeholder="Store domain address"
            isRequired
            required
            isDisabled={!editable}
            value={data.domain}
            startContent={
              <span className="text-sm text-default-400">fmcshops.com/</span>
            }
            onValueChange={(e) => handleChange("domain", e)}
          />

          <Autocomplete
            label="Owner"
            isLoading={loading}
            placeholder="Select a user as owner"
            required
            isRequired
            items={users}
            isDisabled={!editable}
            selectedKey={data.owner}
            onSelectionChange={(e) => handleChange("owner", e?.toString())}
          >
            {(item) => (
              <AutocompleteItem key={item._id}>
                {`${item.firstname} ${item.lastname}`}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        <Input
          label="Renewal Cost"
          type="text"
          placeholder="Store renewal cost"
          isRequired
          required
          isDisabled={!editable}
          value={data.renewal_cost.toString()}
          startContent={<span className="text-sm text-default-400">$</span>}
          onValueChange={(e) => handleChange("renewal_cost", Number(e))}
        />

        <Switch
          classNames={SWITCH_STYLE}
          isDisabled={!editable}
          isSelected={data.is_active}
          onValueChange={(val) => handleChange("is_active", val)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Store Enabled</p>
            <p className="text-sm">
              Enable to make this store accessible for visitors
            </p>
          </div>
        </Switch>

        <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
          <div className="flex flex-col gap-2">
            <p className="text-lg">Header Background Color</p>{" "}
            <HexColorPicker
              color={data.palette.header_background}
              onChange={(c) => handleChange("palette.header_background", c)}
            />{" "}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-lg">Header Text Color</p>{" "}
            <HexColorPicker
              color={data.palette.header_text_color}
              onChange={(c) => handleChange("palette.header_text_color", c)}
            />{" "}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-lg">Background Color</p>{" "}
            <HexColorPicker
              color={data.palette.background}
              onChange={(c) => handleChange("palette.background", c)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-lg">Buttons Color</p>{" "}
            <HexColorPicker
              color={data.palette.primary}
              onChange={(c) => handleChange("palette.primary", c)}
            />{" "}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-lg">Pricing Color</p>{" "}
            <HexColorPicker
              color={data.palette.price_color}
              onChange={(c) => handleChange("palette.price_color", c)}
            />{" "}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-lg">Font Color</p>{" "}
            <HexColorPicker
              color={data.palette.color}
              onChange={(c) => handleChange("palette.color", c)}
            />{" "}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StoreInformation;
