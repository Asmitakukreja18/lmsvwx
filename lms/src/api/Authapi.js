import axios from "axios";

const API = "http://localhost:5000/api/students";

export const loginUser = (data) => axios.post(`${API}/login`, data, { withCredentials: true });
export const registerUser = (data) => axios.post(`${API}/signup`, data, { withCredentials: true });
export const logoutUser = () => axios.get(`${API}/logout`, { withCredentials: true });
