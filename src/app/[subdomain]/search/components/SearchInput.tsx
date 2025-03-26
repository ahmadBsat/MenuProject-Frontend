"use client";

import { StorePopulated } from "@/lib/types/store/store";
import { Divider, Input } from "@nextui-org/react";
import { Search } from "lucide-react";

const SearchInput = ({ store }: { store: StorePopulated }) => {
  console.log(store.products);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Input
        label=""
        type="text"
        placeholder="Name"
        size="lg"
        className="lg:w-3/4 px-4"
        startContent={<Search size={22} color="black" />}
        //   value={branch.name}
        //   onValueChange={(e) => handleChange("name", e)}
      />

      <Divider
        className="my-4 lg:w-3/4"
        style={{ backgroundColor: store.palette.color }}
      />
    </div>
  );
};

export default SearchInput;
