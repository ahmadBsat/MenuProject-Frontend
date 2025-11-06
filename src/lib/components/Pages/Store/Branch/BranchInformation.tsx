"use client";

import { Input, Switch } from "@nextui-org/react";
import { SWITCH_STYLE } from "@/lib/constants/style";

const BranchInformation = ({ storeDetails, branch, handleChange }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex sm:flex-row flex-col gap-2">
        <Input
          label="Name"
          type="text"
          placeholder="Name"
          isRequired
          required
          value={branch.name}
          onValueChange={(e) => handleChange("name", e)}
        />
      </div>

      <Input
        label="Phone Number"
        type="number"
        placeholder="Phone number"
        isRequired
        required
        value={branch.phone_number}
        onValueChange={(e) => handleChange("phone_number", e)}
      />

      <Input
        label="Address"
        type="text"
        placeholder="Address"
        value={branch.address}
        onValueChange={(e) => handleChange("address", e)}
      />

      {storeDetails?.settings.allow_branch_cart_modifications && (
        <Switch
          classNames={SWITCH_STYLE}
          isSelected={branch.display_cart}
          onValueChange={(val) => handleChange("display_cart", val)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Display cart</p>
            <p className="text-sm">
              Disable it to hide the cart icon from the current branch.
            </p>
          </div>
        </Switch>
      )}
    </div>
  );
};

export default BranchInformation;
