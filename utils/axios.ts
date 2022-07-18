import Axios from 'axios';
import { getToken } from './token';

const baseURL = 'http://localhost:8080';

const axiosInstance = Axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (token && token !== 'null' && token !== 'undefined') {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default axiosInstance;
