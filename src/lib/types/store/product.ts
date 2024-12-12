import { Meta } from "../common";

export type Product = {
  _id: string;
  additions: string[];
  branch: string[];
  category: string[];
  createdAt: string;
  updatedAt: string;
  price: number;
  images: string[];
  description: string;
  name: string;
  is_active: boolean;
};

export type ProductForm = Omit<Product, "_id" | "createdAt" | "updatedAt">;

export type ProductAddition = {
  group: string;
  name: string;
  item: string[];
  is_multiple: boolean;
};

export type ProductPopulated = Omit<Product, "additions" | "category"> & {
  additions: ProductAdditionGroup[];
  category: { _id: string; name: string }[];
};

export type ProductItem = {
  _id: string;
  name: string;
  image: string;
  additional_price: number;
};

export type ProductAdditionGroup = {
  group: string;
  name: string;
  is_multiple: boolean;
  items: ProductItem[];
};

export type ProductTable = { data: Product[]; meta: Meta };
