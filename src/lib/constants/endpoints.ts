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
  ME: "/api/v1/user",
  GET_ALL: "/api/v1/admin/users",
  GET_ID: "/api/v1/admin/user/:id",
  CREATE: "/api/v1/admin/user",
  ADMIN_UPDATE: "/api/v1/admin/user",
  UPDATE: "/api/v1/user",
  DELETE: "/api/v1/user/:id",
};

export const STORE_ENDPOINTS = {
  GET: "/api/v1/store",
  GET_ALL: "/api/v1/admin/store",
  GET_ID: "/api/v1/admin/store/:id",
  CREATE: "/api/v1/admin/store",
  ADMIN_UPDATE: "/api/v1/admin/store/:id",
  UPDATE: "/api/v1/store",
  DELETE: "/api/v1/admin/store/:id",
};
