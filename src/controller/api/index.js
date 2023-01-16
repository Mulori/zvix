import axios from "axios";

const api = axios.create({
  baseURL: "http://146.190.55.209:7412",
});

export default api;
