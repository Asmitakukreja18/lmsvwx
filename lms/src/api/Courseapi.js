import axios from "../Utils/axiosInstance";

export const getAllCourses = () => axios.get("/course/allCourse");
export const getCourseById = (id) => axios.get(`/course/${id}`);
