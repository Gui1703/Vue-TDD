import axios from "axios";
import { i18n } from "../locales/i18n";

axios.interceptors.request.use((request) => {
  request.headers["Accept-Language"] = i18n.global.locale;
  return request;
});

export const signUp = async (body) => {
  return await axios.post("/api/1.0/users", body);
};

export const activate = async (token) => {
  return await axios.post(`/api/1.0/token/${token}`);
};

export const loadUsers = async (page) => {
  return await axios.get("/api/1.0/users", { params: { page, size: 3 } });
};

export const getUserById = async (id) => {
  return await axios.get(`/api/1.0/users/${id}`);
};

export const login = async (creds) => {
  return await axios.post("/api/1.0/auth", creds);
};
