import axios from "axios";

const api = axios.create({
  baseURL: "https://node.zvix.tech",
});

export default api;
