import axios from "../Utils/axiosInstance";

export const enrollCourse = (data) => axios.post("/enrollment/enroll", data);
export const getMyEnrollments = () => axios.get("/enrollment/student");
export const markWatched = (id) => axios.put(`/enrollment/watched/${id}`);
export const generateCertificate = (id) =>
  axios.post(`/enrollment/certificate/${id}`);
