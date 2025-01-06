import { CategoryForm } from "../types/store/category";
import { CurrencyForm } from "../types/store/currency";
import { ProductForm, ProductItemForm } from "../types/store/product";
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
  owner: "",
  palette: {
    background: "#fff",
    border: "#fff",
    color: "#000",
    primary: "#a41f13",
    header_background: "#000",
    header_text_color: "#fff",
    price_color: "#fff",
  },
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

export const CURRENCY_INITIAL: CurrencyForm = {
  name: "",
  rate_change: 0.0,
  is_active: true,
};

export const ITEM_INITIAL: ProductItemForm = {
  name: "",
  additional_price: 0,
  image: "",
};
