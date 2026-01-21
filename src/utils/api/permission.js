import axios from "axios";

const BASE_API = import.meta.env.VITE_API_URL;
const PERMISSION_API = `${BASE_API}permission/permissiondata`;


const permissionUrl = (path = "") => `${PERMISSION_API}${path}`;



export const getPermissionGroups = async () => {
  const res = await axios.get(permissionUrl(""));
  return res.data;
};

export const addPermissionGroup = async ({
  group_name,
  scope = "person",
  note = null,
}) => {
  const res = await axios.post(permissionUrl("/addgroup"), {
    group_name,
    scope,
    note,
  });
  return res.data;
};

export const deletePermissionGroup = async (id) => {
  const res = await axios.post(permissionUrl("/deletegroup"), { id });
  return res.data;
};

export const renamePermissionGroup = async ({ id, new_group_name }) => {
  const res = await axios.post(permissionUrl("/renamegroup"), {
    id,
    new_group_name,
  });
  return res.data;
};



/* =========================
   Persons
========================= */

export const getPersonsByGroup = async (group_name) => {
  const res = await axios.get(permissionUrl("/persons"), {
    params: group_name ? { group_name } : {},
  });
  return res.data;
};

export const adjustPersonGroup = async ({
  id_person,
  person_ids,
  new_group_name,
}) => {
  const payload = { new_group_name };

  if (Array.isArray(person_ids)) payload.person_ids = person_ids;
  if (id_person) payload.id_person = id_person;

  const res = await axios.post(permissionUrl("/adjustperson"), payload);
  return res.data;
};

export const adjustPersonAccessTime = async ({
  id_person,
  access_start_time,
  access_end_time,
}) => {
  const res = await axios.post(permissionUrl("/adjusttime"), {
    id_person,
    access_start_time,
    access_end_time,
  });
  return res.data;
};

/* =========================
   Visitor Permission
========================= */

export const getVisitorPermissionGroups = async () => {
  const res = await axios.get(permissionUrl("/visitorsgroup"));
  return res.data;
};
