import { CategoryForm } from "../types/store/category";
import { ProductForm } from "../types/store/product";
import { StoreBranchForm, StoreForm } from "../types/store/store";
import { UserForm } from "../types/user/user";
import { USER_ROLES } from "./variables";

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
  is_active: true,
  domain: "",
  renewal_cost: 100,
};

export const USER_INITIAL: UserForm = {
  email: "",
  password: "",
  firstname: "",
  country_code: "961",
  phone: "",
  is_active: true,
  is_super_admin: false,
  lastname: "",
  role: USER_ROLES.OWNER,
};

export const PRODUCT_INITIAL: ProductForm = {
  additions: [],
  branch: [],
  category: [],
  description: "",
  images: [],
  is_active: true,
  name: "",
  price: 0,
};

export const BRANCH_INITIAL: StoreBranchForm = {
  address: "",
  name: "",
  phone_number: "",
};

export const CATEGORY_INITIAL: CategoryForm = {
  name: "",
};
