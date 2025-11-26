import axios from "../Utils/axiosInstance";

export const registerReseller = (data) =>
  axios.post("/reseller/register", data);

export const loginReseller = (data) =>
  axios.post("/reseller/login", data);
