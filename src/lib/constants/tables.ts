export const ACTION_COLUMNS = [
  { name: "id", uid: "_id", sortable: true },
  { name: "name", uid: "name", sortable: true },
  { name: "method", uid: "api_method", sortable: true },
  { name: "status", uid: "is_active", sortable: true },
  { name: "Created", uid: "createdAt", sortable: true },
  { name: "Updated", uid: "updatedAt", sortable: true },
  { name: "actions", uid: "actions" },
];

export const ACTION_STATUS_OPTION = [
  { name: "Active", uid: "active" },
  { name: "Disabled", uid: "disable" },
];

export const ACTION_VISIBLE_COL = [
  "name",
  "api_method",
  "is_active",
  "createdAt",
  "updatedAt",
  "actions",
];

export const TOPICS_COLUMNS = [
  { name: "id", uid: "_id", sortable: true },
  { name: "title", uid: "title", sortable: true },
  { name: "topic", uid: "topic", sortable: false },
  { name: "status", uid: "is_active", sortable: true },
  { name: "Created", uid: "createdAt", sortable: true },
  { name: "Updated", uid: "updatedAt", sortable: true },
  { name: "actions", uid: "actions" },
];

export const TOPICS_VISIBLE_COL = [
  "title",
  "topic",
  "is_active",
  "createdAt",
  "updatedAt",
  "actions",
];

export const MEMBERS_COLUMNS = [
  { name: "name", uid: "public_name", sortable: true },
  { name: "role", uid: "role", sortable: true },
  { name: "email", uid: "user", sortable: false },
  { name: "joined", uid: "createdAt", sortable: true },
  // { name: "Updated", uid: "updatedAt", sortable: true },
  { name: "actions", uid: "actions" },
];

export const CONTACT_ORG_COLUMNS = [
  { name: "contact", uid: "avatar", sort: "contact.name", sortable: false },
  { name: "phone", uid: "contact.phone", sortable: false },
  // { name: "custom data", uid: "variables", sortable: false },
  { name: "Created", uid: "createdAt", sortable: true },
  { name: "Updated", uid: "updatedAt", sortable: true },
  { name: "actions", uid: "actions" },
];

export const INITIAL_SORT = {
  column: "",
  direction: "ascending",
};
