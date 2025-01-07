"use client";

import { getCookie } from "@/lib/api/_axios";
import { usePreference } from "@/store/account";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const StoreCurrency = ({ currencies }: { currencies: { name: string }[] }) => {
  const flags = { USD: "us", LBP: "lb" };
  const preferred = getCookie("preferredCurrency", "USD");

  const [selected, setSelected] = useState<Selection>(new Set([preferred]));

  const { setCurrency, palette } = usePreference();

  const handleCurrencyChange = (currency: string) => {
    if (currency) {
      const maxExpiryDate = new Date(2147483647 * 1000).toUTCString();
      document.cookie = `preferredCurrency=${currency}; path=/; expires=${maxExpiryDate}`;
      setCurrency(currency);
      // window.location.reload();
    }
  };

  return (
    <Dropdown placement="bottom">
      <DropdownTrigger>
        <Button
          endContent={<ChevronDown size={16} />}
          style={{ color: palette.header_text_color || palette.color }}
          className="bg-transparent text-base uppercase font-medium p-1"
        >
          {selected}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Currency Actions"
        variant="flat"
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {[{ name: "USD" }, ...currencies].map((currency) => (
          <DropdownItem
            key={currency.name}
            value={currency.name}
            textValue={currency.name}
            onClick={() => handleCurrencyChange(currency.name)}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full ml-1 bg-cover bg-no-repeat bg-top inline-block ring-1 fi-${
                  flags[currency.name]
                }`}
              />
              <div>{currency.name}</div>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default StoreCurrency;
