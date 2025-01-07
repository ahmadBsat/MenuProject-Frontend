import { ProductPopulated } from "@/lib/types/store/product";
import ProductCard from "./ProductCard";
import { StorePopulated } from "@/lib/types/store/store";

const ProductList = ({
  data,
  category,
  store,
}: {
  data: ProductPopulated[];
  category: string;
  store: StorePopulated;
}) => {
  return (
    <div className="flex flex-col divide-y-1 divide-default-300 w-full">
      {data.map((product, idx) => {
        return (
          <ProductCard
            key={idx}
            category={category}
            product={product}
            store={store}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
