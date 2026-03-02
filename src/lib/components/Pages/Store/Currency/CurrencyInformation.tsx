"use client";

import { Input, Switch } from "@nextui-org/react";

const CurrencyInformation = ({ currency, handleChange }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex sm:flex-row flex-col gap-2">
        <Input
          label="Currency Name"
          type="text"
          placeholder="Name"
          isRequired
          required
          value={currency.name}
          onValueChange={(e) => handleChange("name", e)}
        />
      </div>

      <Input
        label="Currency Rate To USD"
        type="number"
        placeholder="0.0"
        isRequired
        required
        value={currency.rate_change.toString()}
        onValueChange={(e) => handleChange("rate_change", Number(e))}
      />

       <Switch
        isSelected={!!currency.is_default}
        onValueChange={(val) => handleChange("is_default", val)}
      >
        Default Currency
      </Switch>
    </div>
  );
};

export default CurrencyInformation;
