import axios from "axios";

const url = import.meta.env.VITE_API_URL + "dashboard";

export const deviceActive = async (data) => {
  return axios.get(`${url}/stats`, data);
};
