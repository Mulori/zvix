import axios from "axios";

const token = localStorage.getItem("zvix_token");

const api = axios.create({
  baseURL: "http://192.168.0.109:7412",
});

export default api;
