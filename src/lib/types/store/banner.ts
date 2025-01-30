import { Meta } from "../common";

export type Banner = {
  _id: string;
  images: string[];
  branch: string[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BannerForm = Pick<Banner, "images" | "branch" | "is_active">;

export type BannerPopulated = Pick<Banner, "_id" | "images"> & {
  store: { _id: string; name: string };
};

export type BannerTable = { data: Banner[]; meta: Meta };
