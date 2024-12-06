/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@nextui-org/react";
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

      {product.images?.length > 0 && (
        <div className="flex w-full sm:justify-end justify-center lg:mt-4 mt-2">
          <div className="flex gap-4">
            <Button
              color="danger"
              className="py-2 lg:px-5 px-4 text-white sm:text-base text-sm font-medium hover:scale-90"
              onClick={() => handleChange("images", [])}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpload;
