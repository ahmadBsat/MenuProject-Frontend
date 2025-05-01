import { Meta } from "../common";
import { Product } from "./product";

export type Section = {
  _id: string;
  name: string;
  images: string[];
  order: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SectionForm = Pick<Section, "images" | "name" | "order">;

export type SectionPopulated = Pick<Section, "_id" | "name" | "images"> & {
  products: Product[];
};

export type SectionTable = { data: Section[]; meta: Meta };
