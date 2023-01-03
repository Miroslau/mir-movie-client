import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "http://localhost/api",
  withCredentials: true,
});

export default instanceAxios;
