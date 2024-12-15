"use client";

import { Input } from "@nextui-org/react";

const ItemInformation = ({ item, handleChange }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex sm:flex-row flex-col gap-2">
        <Input
          label="Item Name"
          type="text"
          placeholder="Name"
          isRequired
          required
          value={item.name}
          onValueChange={(e) => handleChange("name", e)}
        />
      </div>

      <Input
        label="Additional Price"
        type="number"
        placeholder="0.0"
        isRequired
        required
        startContent={
          <div className="text-xs text-default-400 font-medium">$</div>
        }
        value={item.additional_price.toString()}
        onValueChange={(e) => handleChange("additional_price", Number(e))}
      />
    </div>
  );
};

export default ItemInformation;
