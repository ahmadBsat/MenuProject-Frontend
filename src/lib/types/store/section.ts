import { Meta } from "../common";
import { Product } from "./product";

export type Section = {
  _id: string;
  name: string;
  images: string[];
  order: number;
  is_active: boolean;
  is_promotive?: boolean;
  promotive_message?: string;
  createdAt: string;
  updatedAt: string;
};

export type SectionForm = Pick<
  Section,
  "images" | "name" | "order" | "is_promotive" | "promotive_message"
>;

export type SectionPopulated = Pick<Section, "_id" | "name" | "images"> & {
  products: Product[];
};

export type SectionTable = { data: Section[]; meta: Meta };
