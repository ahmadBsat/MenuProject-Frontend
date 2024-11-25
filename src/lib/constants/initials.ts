import { StoreForm } from "../types/store/store";

export const USER_INITIAL = {
  _id: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  countryCode: "",
  type: 0,
  verified: false,
  two_factor_enabled: false,
  createdAt: "",
  updatedAt: "",
};

export const INITIAL_META = {
  count: 0,
  page: 0,
  limit: 0,
  total_pages: 0,
  has_next: false,
  has_previous: false,
};

export const STORE_INITIAL: StoreForm = {
  background_image: "",
  logo: "",
  name: "",
  palette: "",
};
