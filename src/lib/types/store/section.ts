import { Meta } from "../common";
import { Product } from "./product";

export type Section = {
  _id: string;
  name: string;
  order: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SectionForm = Pick<Section, "name" | "order">;

export type SectionPopulated = Pick<Section, "_id" | "name"> & {
  products: Product[];
};

export type SectionTable = { data: Section[]; meta: Meta };
