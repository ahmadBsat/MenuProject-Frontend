export const USER_ROLES = {
  ADMIN: "admin",
  EMPLOYEE: "member",
  OWNER: "owner",
  MANAGER: "manager",
};

export const ROLES = [
  {
    name: "Employee",
    description:
      "Employee can only access pages defined in the permissions section",
    value: USER_ROLES.EMPLOYEE,
  },
  {
    name: "Manager",
    description: "Manager is same as employee but can access more pages",
    value: USER_ROLES.MANAGER,
  },
  {
    name: "Admin",
    description: "Admins can access any page and manage all other users",
    value: USER_ROLES.ADMIN,
  },
  {
    name: "Owner",
    description: "Organization owner",
    value: USER_ROLES.OWNER,
  },
];
