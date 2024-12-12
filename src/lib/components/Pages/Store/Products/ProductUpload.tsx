/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Upload from "@/lib/components/Common/Upload";
import { ProductForm } from "@/lib/types/store/product";

type Props = {
  type: string;
  product: ProductForm;
  handleChange: (field: keyof ProductForm, value: any) => void;
};

const ProductUpload = ({ product, type, handleChange }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Upload images={product.images} type={type} onChange={handleChange} />
    </div>
  );
};

export default ProductUpload;
