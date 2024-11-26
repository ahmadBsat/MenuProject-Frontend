export const STORE_COLUMNS = [
  { name: "id", uid: "_id", sortable: true },
  { name: "logo", uid: "logo", sortable: false },
  { name: "name", uid: "name", sortable: true },
  { name: "status", uid: "is_active", sortable: true },
  { name: "Created", uid: "createdAt", sortable: true },
  { name: "Updated", uid: "updatedAt", sortable: true },
  { name: "actions", uid: "actions" },
];

export const STORE_VISIBLE_COL = [
  "logo",
  "name",
  "is_active",
  "createdAt",
  "updatedAt",
  "actions",
];

export const USER_COLUMNS = [
  { name: "id", uid: "_id", sortable: true },
  { name: "firstname", uid: "firstname", sortable: true },
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
