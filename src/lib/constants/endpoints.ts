export const AUTH_ENDPOINTS = {
  LOGIN: "/api/v1/auth/login",
  REGISTER: "/api/v1/auth/register",
  VALIDATE: "/api/v1/auth/validate",
  FORGOT_PASSWORD: "/api/v1/auth/forgot/password",
  RESET_PASSWORD: "/api/v1/auth/reset/password",
  UPDATE_PASSWORD: "/api/v1/auth/change/password",
  VERIFY_PHONE: "/api/v1/auth/verify/phone",
  VERIFY_EMAIL: "/api/v1/auth/verify/email",
  RESEND_EMAIL: "/api/v1/auth/resend/email",
  PLATFORM_INVITE: "/api/v1/auth/platform_invite",
};

export const UPLOAD_ENDPOINTS = {
  CREATE: "/api/v1/upload",
  DELETE: "/api/v1/upload/remove",
};

export const USER_ENDPOINTS = {
  GET_ALL: "/api/v1/admin/users",
  GET_ID: "/api/v1/admin/users/:id",
  CREATE: "/api/v1/admin/users",
  ADMIN_UPDATE: "/api/v1/admin/users/:id",
  DELETE: "/api/v1/admin/users/:id",
};

export const STORE_ENDPOINTS = {
  GET_DOMAIN: "/api/v1/store/:domain",
  GET: "/api/v1/store",
  GET_ALL: "/api/v1/admin/store",
  GET_ID: "/api/v1/admin/store/:id",
  CREATE: "/api/v1/admin/store",
  ADMIN_UPDATE: "/api/v1/admin/store/:id",
  UPDATE: "/api/v1/store",
  DELETE: "/api/v1/admin/store/:id",
  RENEW: "/api/v1/admin/renew/:id",
};

export const PRODUCT_ENDPOINTS = {
  GET_ALL: "/api/v1/products",
  GET_ID: "/api/v1/products/:id",
  CREATE: "/api/v1/products",
  UPDATE: "/api/v1/products/:id",
  DELETE: "/api/v1/products/:id",
};

export const PRODUCT_ITEMS_ENDPOINTS = {
  GET_ALL: "/api/v1/items",
  GET_ID: "/api/v1/items/:id",
  CREATE: "/api/v1/items",
  UPDATE: "/api/v1/items/:id",
  DELETE: "/api/v1/items/:id",
};

export const CATEGORY_ENDPOINTS = {
  GET_ALL: "/api/v1/categories",
  GET_ID: "/api/v1/categories/:id",
  CREATE: "/api/v1/categories",
  UPDATE: "/api/v1/categories/:id",
  DELETE: "/api/v1/categories/:id",
};

export const CURRENCY_ENDPOINTS = {
  GET_ALL: "/api/v1/currencies",
  GET_ID: "/api/v1/currencies/:id",
  CREATE: "/api/v1/currencies",
  UPDATE: "/api/v1/currencies/:id",
  DELETE: "/api/v1/currencies/:id",
};

export const BRANCH_ENDPOINTS = {
  GET_ALL: "/api/v1/branches",
  GET_ID: "/api/v1/branches/:id",
  CREATE: "/api/v1/branches",
  UPDATE: "/api/v1/branches/:id",
  DELETE: "/api/v1/branches/:id",
};

export const CART_ENDPOINTS = {
  GET: "/api/v1/cart/:store",
  ADD: "/api/v1/cart/add",
  REMOVE: "/api/v1/cart/remove",
  RESET: "/api/v1/cart/reset",
  UPDATE: "/api/v1/cart/update",
};
