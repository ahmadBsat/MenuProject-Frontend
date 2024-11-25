import { Meta } from "../common";

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  country_code: string;
  role: number;
  email_verified: boolean;
  phone_verified: boolean;
  is_two_factor_enabled: boolean;
  confirmation_code: string;
  banned_until: string;
  is_archived: boolean;
  is_active: boolean;
  is_super_admin: boolean;
  last_sign_in_at: string;
  provider: string;
  authentication: {
    password: string;
    recovery_token: string;
    recovery_sent_at: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type UserAuthenticated = Omit<
  User,
  | "confirmation_code"
  | "banned_until"
  | "is_archived"
  | "is_active"
  | "is_super_admin"
  | "last_sign_in_at"
  | "provider"
  | "authentication"
>;

export type UserTable = { data: User[]; meta: Meta };
