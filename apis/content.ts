import axios from '@/utils/axios';
import { Content } from '@/interfaces/models/content';

export const getContent = async (): Promise<Content[]> => {
  const res = await axios.get('/contents');
  return res.data;
};

export const createContent = async (content: {
  creatorUserId: number;
  plan: string[];
  happend: string[];
}): Promise<void> => {
  const res = await axios.post('/contents', content);

  return res.data;
};
