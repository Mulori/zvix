import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7412",
});

export default api;
