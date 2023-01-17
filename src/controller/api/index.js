import axios from "axios";

const api = axios.create({
  baseURL: "http://104.248.113.166:7412",
});

export default api;
