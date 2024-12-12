import { Meta } from "../common";
import { Product } from "./product";

export type Category = {
  _id: string;
  name: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CategoryForm = Pick<Category, "name">;

export type CategoryPolulated = Pick<Category, "_id" | "name"> & {
  products: Product[];
};

export type CategoryTable = { data: Category[]; meta: Meta };
