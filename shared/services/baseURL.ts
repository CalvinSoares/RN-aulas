import axios from "axios";
import Api from "./api";
import { getToken } from "../contexts/authContext/auth";

const AulaApi = axios.create({
  baseURL: Api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

AulaApi.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    console.log("token", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default AulaApi;
