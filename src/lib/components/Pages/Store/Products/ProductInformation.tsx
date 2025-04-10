"use client";

import { Input, Textarea } from "@nextui-org/react";
import ProductRelation from "./ProductRelation";
import ProductPricing from "./ProductPricing";
import ProductUpload from "./ProductUpload";

const ProductInformation = ({ product, handleChange }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex sm:flex-row flex-col gap-2">
        <Input
          label="Name"
          type="text"
          placeholder="Name"
          isRequired
          required
          value={product.name}
          onValueChange={(e) => handleChange("name", e)}
        />
      </div>

      <Textarea
        label="Description"
        placeholder="Enter your description"
        maxLength={200}
        description="Max 200 characters"
        value={product.description}
        onValueChange={(e) => handleChange("description", e)}
      />

      <Textarea
        label="Extra Information"
        placeholder="Enter extra information"
        value={product.extra_information}
        onValueChange={(e) => handleChange("extra_information", e)}
      />

      <ProductPricing product={product} handleChange={handleChange} />

      <ProductRelation product={product} handleChange={handleChange} />

      <ProductUpload
        product={product}
        type="product"
        handleChange={handleChange}
      />
    </div>
  );
};

export default ProductInformation;
