export const URLs = {
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
    dashboard: "/admin/dashboard/",
    users: { index: "/admin/users/" },
    stores: {
      index: "/admin/stores/",
      get_id: "/admin/stores/:store_id",
      create: "/admin/stores/create",
    },
  },
  store: {
    index: "/store",
    customize: "/store/customize",
    products: "/products",
    product_items: "/products-items",
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
