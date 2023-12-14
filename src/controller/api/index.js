import axios from "axios";

const api = axios.create({
  baseURL: "https://qualidade.mixcrm.com.br/api",
});

export default api;
