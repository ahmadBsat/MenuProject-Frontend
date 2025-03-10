"use client";

import { Input } from "@nextui-org/react";

const CategoryInformation = ({ category, handleChange }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex sm:flex-row flex-col gap-2">
        {/* Name Input */}
        <Input
          label="Name"
          type="text"
          placeholder="Enter category name"
          isRequired
          required
          value={category.name}
          onValueChange={(e) => handleChange("name", e)}
        />

        <Input
          type="number"
          label="Priority"
          placeholder="0.00"
          isRequired
          required
          value={category.priority.toString()}
          onValueChange={(val) => handleChange("priority", val)}
        />
      </div>
    </div>
  );
};

export default CategoryInformation;
