import axios from "axios";
import refreshService from "./refresh-service";

export const API_URL = `http://localhost:9375/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const orifinalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      orifinalRequest._isRetry = true;
      try {
        const response = await refreshService.refresh();
        localStorage.setItem("token", response.accessToken);
        return $api.request(orifinalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    throw error;
  }
);

export default $api;
