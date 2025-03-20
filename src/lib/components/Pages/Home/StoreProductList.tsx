import ProductList from "./Product/ProductList";
import { usePreference } from "@/store/account";
import { group_products } from "./StoreQuickMenu";
import { StorePopulated } from "@/lib/types/store/store";
import { ProductPopulated } from "@/lib/types/store/product";

export type GroupedCategory = {
  _id: string;
  name: string;
  order: number;
  products: ProductPopulated[];
};

const StoreProductList = ({ store }: { store: StorePopulated }) => {
  const { palette } = usePreference();

  const groups = group_products(store.products).sort(
    (a, b) => a.order - b.order
  );

  return (
    <div className="flex items-center px-4 sm:px-8 justify-center w-full h-full pb-8">
      <div className="flex flex-col gap-2 w-full max-w-screen-lg">
        <div className="flex flex-col gap-3 w-full">
          {groups.map((category, idx) => {
            // // Filter the products in the current category based on the search value
            // const filteredProducts = category.products.filter((product) =>
            //   product.name.toLowerCase().includes(value.toLowerCase()) // Case-insensitive search
            // );

            // // Only render category if there are filtered products
            // if (filteredProducts.length === 0) {
            //   return null; // Skip rendering this category if no products match the filter
            // }

            return (
              <div
                id={category.name}
                key={idx}
                data-scroll-target={category.name}
                className="flex flex-col gap-2 w-full"
              >
                <div
                  style={{
                    color: palette.category_color || palette.color,
                    background: palette.category_background || palette.primary,
                  }}
                  className="w-full p-3 mb-4 rounded-2xl flex items-center justify-center text-center text-lg font-semibold"
                >
                  {category.name}
                </div>

                <ProductList
                  store={store}
                  // data={filteredProducts} // Pass only the filtered products to ProductList
                  data={category.products} // Pass all products in the category to ProductList
                  category={category.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreProductList;
