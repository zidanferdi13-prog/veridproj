import axios from "axios";

const BASE_API = import.meta.env.VITE_API_URL;
const dashboardApi = `${BASE_API}dashboard`;

export const getRealtimeAccess = (params = {}) => {
  return axios.get(`${dashboardApi}/realtime`, { params });
};
