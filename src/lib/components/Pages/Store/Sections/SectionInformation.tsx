"use client";

import { Input } from "@nextui-org/react";
import React from "react";
import SectionUpload from "./SectionUpload";

const SectionInformation = ({ section, handleChange }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Input
        label="Name"
        type="text"
        placeholder="Name"
        isRequired
        required
        value={section.name}
        onValueChange={(e) => handleChange("name", e)}
      />

      <Input
        label="Order"
        type="number"
        placeholder="Order"
        isRequired
        required
        value={section.order?.toString()}
        onValueChange={(e) => handleChange("order", Number(e))}
      />

      <SectionUpload
        section={section}
        type="section"
        handleChange={handleChange}
      />
    </div>
  );
};

export default SectionInformation;
