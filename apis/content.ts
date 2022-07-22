import axios from '@/utils/axios';
import { Content } from '@/interfaces/models/content';

export const getContent = async (): Promise<Content[]> => {
  const res = await axios.get('/contents');
  return res.data;
};
