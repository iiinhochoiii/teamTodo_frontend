import axios from '@/utils/axios';

interface loginProps {
  email: string;
  password: string;
}

export const login = async (params: loginProps): Promise<void> => {
  const res = await axios.post('/auth/login', params);

  return res.data;
};
