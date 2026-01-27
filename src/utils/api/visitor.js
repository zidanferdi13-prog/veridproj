import axios from "axios";

const BASE_API = import.meta.env.VITE_API_URL;
const visitorAPI = `${BASE_API}visitor/visitordata`;

export const getVisitors = () => {
  return axios.get(`${visitorAPI}`);
};

export const addVisitor = (payload) => {
  return axios.post(`${visitorAPI}/add`, payload);
};

export const deleteVisitor = (id_visitor) => {
  return axios.post(`${visitorAPI}/delete`, {
    id_visitor,
  });
};
