import axios from "axios";

const api = axios.create({
  baseURL: "https://api.zvix.tech",
});

export default api;
