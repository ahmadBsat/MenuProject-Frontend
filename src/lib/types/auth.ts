import { User, UserAuthenticated } from "./user/user";

export type Authentication = {
  user: UserAuthenticated;
  token: string;
};

export type Register = Pick<User, "firstname" | "lastname" | "email"> & {
  password: string;
};

export type Login = Pick<User, "email"> & {
  password: string;
};
