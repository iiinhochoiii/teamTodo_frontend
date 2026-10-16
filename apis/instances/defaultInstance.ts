import Axios from 'axios';
import { getToken } from '@/utils/token';

export const defaultInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

defaultInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (token && token !== 'null' && token !== 'undefined') {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
