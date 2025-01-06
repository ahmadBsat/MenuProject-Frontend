"use client";

import { Input } from "@nextui-org/react";
import { ProductForm } from "@/lib/types/store/product";

const ProductPricing = ({ product, handleChange }) => {
  const validate_price = (key: keyof ProductForm, value: string) => {
    // Allow the input of valid numbers including decimals
    if (/^\d*\.?\d*$/.test(value)) {
      handleChange(key, value);
    }
  };

  const handle_blur = (key: keyof ProductForm, value: string) => {
    // Ensure the value is converted to a valid number on blur
    const numeric_value = parseFloat(value);
    const decimal_value =
      isNaN(numeric_value) || numeric_value < 0 ? 0 : numeric_value;
    handleChange(key, decimal_value);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Input
        type="text"
        label="Price"
        placeholder="0.00"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        isRequired
        required
        value={product.price.toString()}
        onValueChange={(val) => validate_price("price", val)}
        onBlur={(e) => handle_blur("price", e.target.value)}
      />
    </div>
  );
};

export default ProductPricing;
