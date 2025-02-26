import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const getById = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },  // Include the Authorization header
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);  // Pass config as second argument
  const response = await request;
  return response.data;
};

export default { getAll, getById, create, update, setToken, deleteBlog };
