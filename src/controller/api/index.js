import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.110:7412",
});

export default api;
