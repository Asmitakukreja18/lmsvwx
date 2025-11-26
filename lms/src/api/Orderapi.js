import axios from "../Utils/axiosInstance";

export const createOrder = (data) => axios.post("/order/create", data);
export const verifyOrder = (data) => axios.post("/order/verify", data);
