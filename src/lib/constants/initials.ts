import { BannerForm } from "../types/store/banner";
import { CategoryForm } from "../types/store/category";
import { CurrencyForm } from "../types/store/currency";
import { ProductForm, ProductItemForm } from "../types/store/product";
import { SectionForm } from "../types/store/section";
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
  watermark: true,
  logo: "",
  name: "",
  owner: "",
  custom_domain: "",
  store_label: "Menu",
  palette: {
    background: "#fff",
    border: "#fff",
    color: "#000",
    primary: "#a41f13",
    header_background: "#000",
    header_text_color: "#fff",
    price_color: "#fff",
    checkout_content: "",
    checkout_background: "",
    category_color: "",
    category_background: "",
    clear_button_color: "",
    clear_button_background: "",
    section_color: "",
    section_background: "",
    active_section_color: "",
    active_section_background: "",
  },
  settings: { display_pricing: true },
  is_active: true,
  domain: "",
  renewal_cost: 100,
  logoDefault: false,
  vat_exclusive: false,
  vat_percentage: 0,
  use_sections: false,
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
  extra_information: "",
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
  section: [],
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

export const BANNER_INITIAL: BannerForm = {
  images: [],
  branch: [],
  is_active: true,
};

export const SECTION_INITIAL: SectionForm = {
  name: "",
  order: 0,
  images: [],
};
