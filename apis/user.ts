import axios from '@/utils/axios';
import { User } from '@/interfaces/models/user';

export const getMy = async (): Promise<User> => {
  const res = await axios.get('/users/my');

  return res.data;
};
