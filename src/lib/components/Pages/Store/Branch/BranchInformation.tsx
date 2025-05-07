"use client";

import { Input } from "@nextui-org/react";

const BranchInformation = ({ branch, handleChange }) => {
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
    </div>
  );
};

export default BranchInformation;
