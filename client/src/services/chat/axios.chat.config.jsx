import axios from 'axios';
// import GetCookie from "../hooks/GetCookie";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_CHAT_URL || 'http://localhost:5003',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});

instance.interceptors.request.use(
  function (config) {
    const token = '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
