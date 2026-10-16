import { defaultInstance } from '@/apis/instances/defaultInstance';

interface loginProps {
  email: string;
  password: string;
}

interface createUserProps {
  email: string;
  password: string;
  name: string;
  phone: string;
  position?: string;
}

const login = async (params: loginProps): Promise<void> => {
  const res = await defaultInstance.post('/auth/login', params);

  return res.data;
};

const checkEmail = async (email: string) => {
  const res = await defaultInstance.get(`/auth/checkEmail/${email}`);

  return res.data;
};

const createUser = async (params: createUserProps) => {
  const res = await defaultInstance.post('/auth/create', params);

  return res.data;
};

export const authService = {
  login,
  checkEmail,
  createUser,
};
