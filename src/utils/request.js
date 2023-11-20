import axios from "axios";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "./config";

const client = axios.create({ baseURL: API_ENDPOINT });

export const request = ({ ...options }) => {
  client.defaults.headers.common["Accept"] = "application/json";
  client.defaults.headers.common["Content-Type"] = "application/json";

  const token = Cookies.get("token_perusahaan");
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return client(options);
};
