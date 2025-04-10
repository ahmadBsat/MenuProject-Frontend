"use client";

// import { getCookie } from "@/lib/api/_axios";
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

const StoreCurrency = ({
  currencies,
}: {
  currencies: { name: string; rate_change: number }[];
}) => {
  const flags = { USD: "us", LBP: "lb" };
  const default_currency = [{ name: "USD", rate_change: 1 }];

  const { setCurrency, palette, currency } = usePreference();
  const [selected, setSelected] = useState<Selection>(new Set([currency.name]));

  const handleCurrencyChange = (currency: {
    name: string;
    rate_change: number;
  }) => {
    if (currency) {
      // const maxExpiryDate = new Date(2147483647 * 1000).toUTCString();
      // document.cookie = `preferredCurrency=${currency.name}; path=/; expires=${maxExpiryDate}`;
      setCurrency(currency);
      // window.location.reload();
    }
  };

  useEffect(() => {
    setSelected(new Set([currency.name]));
  }, [currency]);

  return (
    <Dropdown placement="bottom">
      <DropdownTrigger>
        <Button
          endContent={<ChevronDown size={16} />}
          style={{ color: palette.header_text_color || palette.color }}
          className="bg-transparent text-sm sm:text-base uppercase font-medium p-1"
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
        disallowEmptySelection
      >
        {[...default_currency, ...currencies].map((currency) => (
          <DropdownItem
            key={currency.name}
            value={currency.name}
            textValue={currency.name}
            onClick={() => handleCurrencyChange(currency)}
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
