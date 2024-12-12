import { Meta } from "../common";
import { CategoryPolulated } from "./category";
import { Currency } from "./currency";
import { ProductPopulated } from "./product";

export type Store = {
  _id: string;
  name: string;
  logo: string;
  background_image: string;
  palette: string;
  createdAt: string;
  updatedAt: string;
  domain: string;
  renewal_date: string;
  is_active: boolean;
  renewal_cost: number;
};

export type StoreForm = Omit<
  Store,
  "_id" | "createdAt" | "updatedAt" | "renewal_date"
>;

export type StoreBranch = {
  _id: string;
  name: string;
  address: string;
  phone_number: string;
  createdAt: string;
  updatedAt: string;
};

export type StoreBranchForm = Omit<
  StoreBranch,
  "_id" | "createdAt" | "updatedAt"
>;

export type StoreBranchTable = { data: StoreBranch[]; meta: Meta };

export type StoreTable = { data: Store[]; meta: Meta };

export type StorePopulatedOLD = {
  logo: string;
  palette: string;
  categories: CategoryPolulated[];
  currencies: Currency[];
  branches: StoreBranch[];
};

export type StorePopulated = {
  _id: string;
  name: string;
  logo: string;
  palette: StorePalette;
  background_image: string;
  branches: StoreBranch[];
  products: ProductPopulated[];
  currencies: { name: string }[];
  categories: [];
};

export type StorePalette = {
  background: string;
  color: string;
  border: string;
  primary: string;
};
