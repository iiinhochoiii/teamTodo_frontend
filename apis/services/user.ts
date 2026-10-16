import { defaultInstance } from '@/apis/instances/defaultInstance';
import { User, UserParams } from '@/types/user';

const getMy = async (token?: string): Promise<User> => {
  const res = await defaultInstance.get('/users/my', {
    ...(token && {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  });

  return res.data;
};

const updateUser = async (params: UserParams) => {
  const res = await defaultInstance.patch('/users', params);

  return res.data;
};

export const userService = {
  getMy,
  updateUser,
};
