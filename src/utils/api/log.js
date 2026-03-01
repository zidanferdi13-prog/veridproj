import axios from "axios";

const BASE_API = import.meta.env.VITE_API_URL;
const logApi = `${BASE_API}log`;

export const getAccessLogs = (params = {}) => {
  return axios.get(`${logApi}/logdata/access`, { params });
};

export const getAuthorizationLogs = (params = {}) => {
  return axios.get(`${logApi}/logdata/authorization`, { params });
};

export const getOperationLogs = (params = {}) => {
  return axios.get(`${logApi}/logdata/operation`, { params });
};

export const getAlarmLogs = (params = {}) => {
  return axios.get(`${logApi}/logdata/alarm`, { params });
};
