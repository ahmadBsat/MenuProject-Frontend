export const STORE_COLUMNS = [
  { name: "id", uid: "_id", sortable: true },
  { name: "logo", uid: "logo", sortable: false },
  { name: "name", uid: "name", sortable: true },
  { name: "domain", uid: "domain", sortable: true },
  { name: "status", uid: "is_active", sortable: true },
  { name: "Created", uid: "createdAt", sortable: true },
  { name: "Updated", uid: "updatedAt", sortable: true },
  { name: "actions", uid: "actions" },
];

export const STORE_VISIBLE_COL = [
  "logo",
  "name",
  "domain",
  "is_active",
  "createdAt",
  "updatedAt",
  "actions",
];

export const PLANS_COLUMNS = [
  { name: "id", uid: "_id", sortable: true },
  { name: "name", uid: "name", sortable: true },
  { name: "domain", uid: "domain", sortable: true },
  { name: "status", uid: "is_active", sortable: true },
  { name: "renewal", uid: "renewal_date", sortable: true },
  { name: "renewal status", uid: "renewal_status", sortable: false },
  { name: "cost", uid: "renewal_cost", sortable: true },
  { name: "actions", uid: "actions" },
];

export const PLANS_VISIBLE_COL = [
  "name",
  "domain",
  "is_active",
  "renewal_date",
  "renewal_status",
  "renewal_cost",
  "actions",
];

export const USER_COLUMNS = [
  { name: "id", uid: "_id", sortable: true },
  { name: "name", uid: "firstname", sortable: true },
  { name: "status", uid: "is_active", sortable: true },
  { name: "Created", uid: "createdAt", sortable: true },
  { name: "Updated", uid: "updatedAt", sortable: true },
  { name: "actions", uid: "actions" },
];

export const USER_VISIBLE_COL = [
  "firstname",
  "is_active",
  "createdAt",
  "updatedAt",
  "actions",
];

export const INITIAL_SORT = {
  column: "",
  direction: "ascending",
};
