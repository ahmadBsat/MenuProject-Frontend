"use client";

import { Input } from "@nextui-org/react";

const CategoryInformation = ({ category, handleChange }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Input
        label="Name"
        type="text"
        placeholder="Name"
        isRequired
        required
        value={category.name}
        onValueChange={(e) => handleChange("name", e)}
      />

      <Input
        label="Order"
        type="number"
        placeholder="Order"
        isRequired
        required
        value={category.order?.toString()}
        onValueChange={(e) => handleChange("order", Number(e))}
      />
    </div>
  );
};

export default CategoryInformation;
