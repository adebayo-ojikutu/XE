import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_PORT, // Use your BASE_URL
  withCredentials: true,
});


export default api;
