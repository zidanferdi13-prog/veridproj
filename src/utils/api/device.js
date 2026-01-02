import axios from "axios";

const url = "http://localhost:3000/device";

export const addDevice = async (data) => {
  return axios.post(`${url}/devicedata/adddevice`, data);
};
export const getDevices = async () => {
  return axios.get(`${url}/devicedata`);
};
export const deleteDevice = async (id_device) => {
  return axios.post(`${url}/devicedata/deletedevice`, {
    id_device,
  });
};

//edit device
export const editDevice = async (data) => {
  return axios.post(`${url}/devicedata/configDevice`, data);
};

export const configNetwork = async (data) => {
  return axios.post(`${url}/devicedata/configNetwork`, data);
};

export const remoteUnlock = async (data) => {
  return axios.post(`${url}/devicedata/remote`, data);
};
