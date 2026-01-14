import axios from "axios";

const api = axios.create({
  baseURL: "https://gigflow-1-mr68.onrender.com/api",
  withCredentials: true
});

export default api;
