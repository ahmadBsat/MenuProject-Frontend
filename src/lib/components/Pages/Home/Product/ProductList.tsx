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
  // Filter the products based on the value (search term)
  // const filteredData = data.filter((product) =>
  //   product.name.toLowerCase().includes(value.toLowerCase()) // Case-insensitive search
  // );

  return (
    <div className="flex flex-col divide-y-1 divide-default-300 w-full">
      {data.length > 0 ? (
        data.map((product, idx) => (
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
