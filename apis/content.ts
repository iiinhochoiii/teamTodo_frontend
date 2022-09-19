import axios from '@/utils/axios';
import { Content } from '@/interfaces/models/content';
import { getTeamsByName } from './team';

export const getContent = async (): Promise<Content[]> => {
  const res = await axios.get('/contents');
  return res.data;
};

export const getContentByTeam = async (
  teamName: string
): Promise<Content[]> => {
  const team = await getTeamsByName(teamName);

  const res = await axios.get(`/contents/${team.id}`);
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

export const updateContent = async (content: {
  id: number;
  plan: string[];
  happend: string[];
}): Promise<void> => {
  const res = await axios.put('/contents', content);

  return res.data;
};

export const deleteContent = async (id: number) => {
  const res = await axios.delete(`/contents/${id}`);

  return res.data;
};
