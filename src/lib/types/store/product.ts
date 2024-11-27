import { Meta } from "../common";

export type ProductAddition = {
  group: string;
  name: string;
  item: string[];
  is_multiple: boolean;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string[];
  is_active: boolean;
  branch: string[];
  additions: [];
  createdAt: string;
  updatedAt: string;
};

export type ProductItem = {
  _id: string;
  name: string;
  image: string;
  additional_price: number;
};

export type ProductTable = { data: Product[]; meta: Meta };
