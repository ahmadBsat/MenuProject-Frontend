"use client";

import { getCookie } from "@/lib/api/_axios";
import { Currency } from "@/lib/types/store/currency";
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
import { useEffect, useState } from "react";

const StoreCurrency = () => {
  const flags = { USD: "us", LBP: "lb" };
  const preferred = getCookie("preferredCurrency", "USD");

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selected, setSelected] = useState<Selection>(new Set([preferred]));

  const { setCurrency, palette } = usePreference();

  const handleCurrencyChange = (currency: string) => {
    if (currency) {
      const maxExpiryDate = new Date(2147483647 * 1000).toUTCString();
      document.cookie = `preferredCurrency=${currency}; path=/; expires=${maxExpiryDate}`;
      setCurrency(currency);
      window.location.reload();
    }
  };

  const getCurrencies = async () => {
    try {
      //   const currencies = await API_CURRENCY.getActiveCurrencies();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCurrencies([{ name: "USD" }, { name: "LBP" }] as any);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <Dropdown placement="bottom">
      <DropdownTrigger>
        <Button
          endContent={<ChevronDown size={16} />}
          style={{ color: palette.color }}
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
        {currencies.map((currency) => (
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
