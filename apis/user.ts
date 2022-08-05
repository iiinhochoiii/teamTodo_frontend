import axios from '@/utils/axios';
import { User } from '@/interfaces/models/user';

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
