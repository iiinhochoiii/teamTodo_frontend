import axios from '@/utils/axios';
import { User, UserParams } from '@/interfaces/models/user';

export const getMy = async (token?: string): Promise<User> => {
  const res = await axios.get('/users/my', {
    ...(token && {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  });

  return res.data;
};

export const updateUser = async (params: UserParams) => {
  const res = await axios.patch('/users', params);

  return res.data;
};
