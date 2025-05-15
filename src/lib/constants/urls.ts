export const URLs = {
  home: "/",
  checkout: "/checkout",
  cart: "/cart",
  about: "/about",
  branch: "/branch",
  search: "/search",
  account: {
    profile: "/settings/account",
    setting: "/settings/account",
    notification: "/org/:organization/notifications",
  },
  auth: {
    register: "/register/",
    login: "/",
    forgotPassword: "/reset/password/",
    resetPassword: "/reset-password/",
    confirmation: "/phone-confirmation/",
    invite: "/invitation/",
    waitlist: "/waitlist/",
  },
  admin: {
    // dashboard: "/admin/dashboard/",
    dashboard: "/admin/stores/",
    users: {
      index: "/admin/users/",
      get_id: "/admin/users/:user_id",
      create: "/admin/users/create",
    },
    stores: {
      index: "/admin/stores/",
      get_id: "/admin/stores/:store_id",
      create: "/admin/stores/create",
    },
    plans: { index: "/admin/plans" },
  },
  store: {
    index: "/store",
    // dashboard: "/store/dashboard",
    dashboard: "/store/products",
    customize: "/store/customize",
    branch: {
      index: "/store/branches",
      get_id: "/store/branches/:id",
      create: "/store/branches/create",
    },
    currencies: {
      index: "/store/currencies",
      get_id: "/store/currencies/:id",
      create: "/store/currencies/create",
    },
    products: {
      index: "/store/products",
      get_id: "/store/products/:id",
      create: "/store/products/create",
    },
    category: {
      index: "/store/categories",
      get_id: "/store/categories/:id",
      create: "/store/categories/create",
    },
    product_items: {
      index: "/store/products-items",
      get_id: "/store/products-items/:id",
      create: "/store/products-items/create",
    },
    banners: {
      index: "/store/banners",
      create: "/store/banners/create",
      get_id: "/store/banners/:id",
    },
    sections: {
      index: "/store/sections",
      create: "/store/sections/create",
      get_id: "/store/sections/:id",
    }
  },
};

export function getUrl(
  path: string,
  lang?: string,
  props?: Record<string, string> | undefined
) {
  if (props) {
    for (const prop in props) {
      path = path.replaceAll(`{${prop}}`, props[prop]);
    }
  }
  if (lang) {
    path = `/${lang}/${path}`;
  }

  return path.replaceAll("//", "/"); // just in case anyone formats Urls in a wrong way.
}
