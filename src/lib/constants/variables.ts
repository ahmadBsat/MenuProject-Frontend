export const USER_ROLES = {
  ADMIN: "admin",
  OWNER: "owner",
};

export const ROLES = [
  {
    name: "Admin",
    description: "Admins can access any page and manage all other users",
    value: USER_ROLES.ADMIN,
  },
  {
    name: "Owner",
    description: "Store owner",
    value: USER_ROLES.OWNER,
  },
];
