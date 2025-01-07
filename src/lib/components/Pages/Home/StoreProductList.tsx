import ProductList from "./Product/ProductList";
import { usePreference } from "@/store/account";
import { ProductPopulated } from "@/lib/types/store/product";
import { StorePopulated } from "@/lib/types/store/store";

export type GroupedCategory = {
  _id: string;
  name: string;
  products: ProductPopulated[];
};

const StoreProductList = ({ store }: { store: StorePopulated }) => {
  const { palette } = usePreference();

  const group_products = (products: ProductPopulated[]): GroupedCategory[] => {
    const category_map: { [key: string]: GroupedCategory } = {};

    products.forEach((product) => {
      product.category.forEach((category) => {
        if (!category_map[category._id]) {
          category_map[category._id] = {
            _id: category._id,
            name: category.name,
            products: [],
          };
        }
        category_map[category._id].products.push(product);
      });
    });

    return Object.values(category_map);
  };

  const groups = group_products(store.products);

  return (
    <div className="flex items-center px-4 sm:px-8 justify-center w-full h-full pb-8">
      <div className="flex flex-col gap-2 w-full max-w-screen-lg">
        <div className="flex flex-col gap-3 w-full">
          {groups.map((category, idx) => {
            return (
              <div
                id={category.name}
                key={idx}
                className="flex flex-col gap-2 w-full"
              >
                <div
                  style={{ color: palette.color, background: palette.primary }}
                  className="w-full p-3 mb-4 rounded-2xl flex items-center justify-center text-center text-lg font-semibold"
                >
                  {category.name}
                </div>

                <ProductList
                  store={store}
                  data={category.products}
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
