"use client";

import { toString } from "lodash";
import { Input } from "@nextui-org/react";
import { ProductForm } from "@/lib/types/store/product";

const ProductPricing = ({ product, handleChange }) => {
  const validatePrice = (key: keyof ProductForm, value: number | string) => {
    const numericValue = Number(value);
    const decimalValue = numericValue < 0 ? 0 : numericValue;
    handleChange(key, decimalValue);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Input
        type="number"
        label="Price"
        placeholder="0.00"
        min={0}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        isRequired
        required
        value={toString(product.price)}
        onValueChange={(e) => validatePrice("price", e)}
      />
    </div>
  );
};

export default ProductPricing;
