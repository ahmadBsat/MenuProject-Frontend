"use client";

import { Input, Switch, Textarea } from "@nextui-org/react";
import React from "react";
import SectionUpload from "./SectionUpload";

const SectionInformation = ({ section, handleChange }) => {
  return (
    <div className="w-full flex flex-col gap-2 space-y-5">
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

      <Switch
        isSelected={!!section.is_promotive}
        onValueChange={(val) => handleChange("is_promotive", val)}
      >
        Promotive Section
      </Switch>
      {section.is_promotive && (
        <Textarea
          label="Promotive Message"
          placeholder="Enter promotive message"
          value={section.promotive_message || ""}
          onValueChange={(val) => handleChange("promotive_message", val)}
        />
      )}
      <SectionUpload
        section={section}
        type="section"
        handleChange={handleChange}
      />
    </div>
  );
};

export default SectionInformation;
