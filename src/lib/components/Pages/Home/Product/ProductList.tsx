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
  // Sort products by order (highest first)
  const sortedData = [...data].sort((a, b) => (b.order || 0) - (a.order || 0));

  return (
    <div className="flex flex-col divide-y-1 divide-default-300 w-full">
      {sortedData.length > 0 ? (
        sortedData.map((product, idx) => (
          <ProductCard
            key={idx}
            category={category}
            product={product}
            store={store}
          />
        ))
      ) : (
        <div className="text-center text-gray-500">No products found</div>
      )}
    </div>
  );
};

export default ProductList;
