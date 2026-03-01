import axios from "axios";

const BASE_API = import.meta.env.VITE_API_URL;
const attendanceSysApi = `${BASE_API}attendancesys`;

export const getAttendanceSysGroups = () => {
  return axios.get(`${attendanceSysApi}/groups`);
};

export const addAttendanceSysGroup = (data) => {
  return axios.post(`${attendanceSysApi}/groups/add`, data);
};

export const deleteAttendanceSysGroup = (id) => {
  return axios.post(`${attendanceSysApi}/groups/delete`, { id });
};

export const updateAttendanceSysGroup = (data) => {
  return axios.post(`${attendanceSysApi}/groups/update`, data);
};

export const getAttendanceSysMembers = (id_group) => {
  return axios.get(`${attendanceSysApi}/members`, { params: { id_group } });
};

export const getAttendanceSysStats = (date) => {
  return axios.get(`${attendanceSysApi}/stats`, { params: { date } });
};
