import axios from "axios";

const BASE_API = import.meta.env.VITE_API_URL;
const settingsApi = `${BASE_API}settings`;

export const getSettings = (id_user) => {
  return axios.get(`${settingsApi}/settingsdata`, { params: { id_user } });
};

export const updateSetting = (data) => {
  return axios.post(`${settingsApi}/settingsdata/update`, data);
};
