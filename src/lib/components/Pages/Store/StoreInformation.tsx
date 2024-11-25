"use client";

import { Card, Input, Switch, Textarea } from "@nextui-org/react";
import { CARD_STYLE, SWITCH_STYLE } from "@/lib/constants/style";

const StoreInformation = ({ data, editable, handleChange }) => {
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

          <Textarea
            label="Description"
            type="text"
            placeholder="Detailed description on what can this action do..."
            isRequired
            required
            isDisabled={!editable}
            value={data.description}
            onValueChange={(e) => handleChange("description", e)}
          />
        </div>
      </Card>

      <Card shadow="none" className={CARD_STYLE}>
        <div className="text-lg sm:text-xl px-1">Status</div>

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
      </Card>
    </div>
  );
};

export default StoreInformation;
