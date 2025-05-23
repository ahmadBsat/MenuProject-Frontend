import { usePreference } from "@/store/account";
import { StorePopulated } from "@/lib/types/store/store";
import { ProductPopulated } from "@/lib/types/store/product";
import { group_products } from "@/lib/components/Pages/Home/StoreQuickMenu";
import ProductList from "@/lib/components/Pages/Home/Product/ProductList";

export type GroupedCategory = {
  _id: string;
  name: string;
  order: number;
  products: ProductPopulated[];
};

const SearchProductList = ({
  store,
  value,
}: {
  store: StorePopulated;
  value: string;
}) => {
  const { palette } = usePreference();

  const groups = group_products(store.products).sort(
    (a, b) => a.order - b.order
  );

  if (value?.length === 0 || !value) {
    return (
      <div className="flex items-center justify-center w-full h-full pb-8">
        Looking for something? <br />
        Type its name to search.
      </div>
    );
  }

  return (
    <div className="flex items-start px-4 sm:px-8 justify-center w-full h-full pb-8">
      <div className="flex flex-col gap-2 w-full max-w-screen-lg">
        <div className="flex flex-col gap-3 w-full">
          {groups.map((category, idx) => {
            const filteredProducts = category.products.filter((product) =>
              product.name.toLowerCase().includes(value.toLowerCase())
            );
            if (filteredProducts.length === 0) {
              return null;
            }

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
                  data={filteredProducts} // Pass only the filtered products to ProductList
                  // data={category.products} // Pass all products in the category to ProductList
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

export default SearchProductList;
