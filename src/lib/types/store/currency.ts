import { Meta } from "../common";

export type Currency = {
  _id: string;
  name: string;
  rate_change: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CurrencyForm = Pick<Currency, "is_active" | "name" | "rate_change">;

export type CurrencyTable = {
  data: Currency[];
  meta: Meta;
};
