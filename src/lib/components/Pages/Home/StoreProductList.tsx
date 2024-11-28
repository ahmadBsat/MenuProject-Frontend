import ProductList from "./Product/ProductList";
import { CategoryPolulated } from "@/lib/types/store/category";

const StoreProductList = ({ data }: { data: CategoryPolulated[] }) => {
  return (
    <div className="flex items-center px-4 sm:px-8 justify-center w-full pb-8">
      <div className="flex flex-col gap-2 w-full max-w-screen-lg">
        <div className="flex flex-col gap-3 w-full">
          {data.map((category, idx) => {
            return (
              <div
                id={category.name}
                key={idx}
                className="flex flex-col gap-2 w-full"
              >
                <div className="w-full p-3 mb-4 bg-primary text-white rounded-2xl flex items-center justify-center text-center text-lg font-semibold">
                  {category.name}
                </div>

                <ProductList
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
