"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Card,
  Input,
  Switch,
} from "@nextui-org/react";
import { CARD_STYLE, SWITCH_STYLE } from "@/lib/constants/style";
import { ROLES } from "@/lib/constants/variables";
import { UserForm } from "@/lib/types/user/user";
import { NestedKeyOf } from "@/lib/types/common";
import { useParams } from "next/navigation";

const UserInformation = ({
  data,
  handleChange,
}: {
  data: UserForm;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (field: NestedKeyOf<UserForm>, value: any) => void;
}) => {
  const params = useParams();
  const user_id = params.id as string; // if updating

  return (
    <div className="w-full flex flex-col gap-4">
      <Card shadow="none" className={CARD_STYLE}>
        <div className="text-lg sm:text-xl px-1">Information</div>

        <div className="flex flex-col gap-4 w-full">
          <Input
            label="First Name"
            type="text"
            placeholder="First Name"
            isRequired
            required
            value={data.firstname}
            onValueChange={(e) => handleChange("firstname", e)}
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Last Name"
            isRequired
            required
            value={data.lastname}
            onValueChange={(e) => handleChange("lastname", e)}
          />

          <Autocomplete
            label="Role"
            placeholder="Select a user role"
            required
            isRequired
            items={ROLES}
            selectedKey={data.role}
            onSelectionChange={(e) => handleChange("role", e?.toString())}
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.name}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="Email Address"
          isRequired
          required
          value={data.email}
          onValueChange={(e) => handleChange("email", e)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Account Password"
          // isRequired
          // required
          isDisabled={user_id && data.is_super_admin ? true : false}
          // value={data.password}
          onValueChange={(e) => handleChange("password", e)}
        />

        <Switch
          classNames={SWITCH_STYLE}
          isSelected={data.is_active}
          onValueChange={(val) => handleChange("is_active", val)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">User Enabled</p>
            <p className="text-sm">Enable to make this user account active</p>
          </div>
        </Switch>

        {/* <Switch
          classNames={SWITCH_STYLE}
          isSelected={data.is_super_admin}
          onValueChange={(val) => handleChange("is_super_admin", val)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">User Admin</p>
            <p className="text-sm">Enable to make this user platform admin</p>
          </div>
        </Switch> */}
      </Card>
    </div>
  );
};

export default UserInformation;
