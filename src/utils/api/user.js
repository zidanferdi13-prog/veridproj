import axios from "axios";

const urlApi = import.meta.env.VITE_API_URL;

export const getDataUser = async () => {
  const response = axios.post(`${urlApi}user/userdata`);
  return response;
};