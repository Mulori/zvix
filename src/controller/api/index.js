import axios from "axios";

const token = localStorage.getItem("zvix_token");

const api = axios.create({
  baseURL: "http://192.168.0.106:7412",
  headers: {
    authorization: "Bearer ".concat(token),
  },
});

export default api;
