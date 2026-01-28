import axios from "axios";

const BASE_API = import.meta.env.VITE_API_URL;
const attendanceApi = `${BASE_API}attendance/attendancedata`;

export const getAttendance = () => {
  return axios.get(`${attendanceApi}`);
};
