import { Product } from "./product";

export type Category = {
  _id: string;
  name: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CategoryPolulated = Pick<Category, "_id" | "name"> & {
  products: Product[];
};
