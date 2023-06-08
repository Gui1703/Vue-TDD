import axios from "axios";
import { i18n } from "../locales/i18n";

export const signUp = async (body) => {
  return await axios.post("/api/1.0/users", body, {
    headers: { "Accept-Language": i18n.global.locale },
  });
};

export const activate = async (token) => {
  return await axios.post(`/api/1.0/token/${token}`);
};

export const loadUsers = async (page) => {
  return await axios.get("/api/1.0/users", { params: { page, size: 3 } });
};
