"use client";

import { Input } from "@nextui-org/react";

const CategoryInformation = ({ category, handleChange }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex sm:flex-row flex-col gap-2">
        <Input
          label="Name"
          type="text"
          placeholder="Name"
          isRequired
          required
          value={category.name}
          onValueChange={(e) => handleChange("name", e)}
        />
      </div>
    </div>
  );
};

export default CategoryInformation;
