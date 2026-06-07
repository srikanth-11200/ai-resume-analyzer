import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const analyzeResume = (formData) => {
  return API.post("/analyze-resume", formData);
};

export default API;
