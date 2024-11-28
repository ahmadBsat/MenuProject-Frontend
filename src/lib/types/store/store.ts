import { Meta } from "../common";
import { CategoryPolulated } from "./category";
import { Currency } from "./currency";

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
};

export type StoreTable = { data: Store[]; meta: Meta };

export type StorePopulated = {
  logo: string;
  palette: string;
  categories: CategoryPolulated[];
  currencies: Currency[];
  branches: StoreBranch[];
};
