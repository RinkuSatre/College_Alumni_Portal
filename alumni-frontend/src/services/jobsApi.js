import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------------
// Request Interceptor
// -------------------------

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------------
// Jobs API
// -------------------------

export const getJobs = () => API.get("/jobs/");

export const getJobById = (id) => API.get(`/jobs/${id}/`);

export const createJob = (jobData) => API.post("/jobs/", jobData);

export const updateJob = (id, jobData) =>
  API.put(`/jobs/${id}/`, jobData);

export const deleteJob = (id) =>
  API.delete(`/jobs/${id}/`);

export default API;