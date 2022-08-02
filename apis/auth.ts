import axios from '@/utils/axios';

interface loginProps {
  email: string;
  password: string;
}

interface createUserProps {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export const login = async (params: loginProps): Promise<void> => {
  const res = await axios.post('/auth/login', params);

  return res.data;
};

export const checkEmail = async (email: string) => {
  const res = await axios.get(`/auth/checkEmail/${email}`);

  return res.data;
};

export const createUser = async (params: createUserProps) => {
  const res = await axios.post('/auth/create', params);

  return res.data;
};
