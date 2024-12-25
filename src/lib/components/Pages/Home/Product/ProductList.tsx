import { ProductPopulated } from "@/lib/types/store/product";
import ProductCard from "./ProductCard";

const ProductList = ({
  data,
  category,
}: {
  data: ProductPopulated[];
  category: string;
}) => {
  return (
    <div className="flex flex-col divide-y-1 divide-default-300 w-full">
      {data.map((product, idx) => {
        return <ProductCard key={idx} category={category} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
