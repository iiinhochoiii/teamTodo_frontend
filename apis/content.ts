import axios from '@/utils/axios';
import { responseContent } from '@/interfaces/models/content';
import { getTeamsByName } from './team';

export const getContent = async (pageOption: {
  page: number;
  pageSize: number;
}): Promise<responseContent> => {
  const res = await axios.get('/contents', {
    params: {
      ...pageOption,
    },
  });
  return res.data;
};

export const getContentByTeam = async (
  teamName: string,
  pageOption: {
    page: number;
    pageSize: number;
  }
): Promise<responseContent> => {
  const team = await getTeamsByName(teamName);

  const res = await axios.get(`/contents/${team.id}`, {
    params: {
      ...pageOption,
    },
  });
  return res.data;
};

export const createContent = async (content: {
  creatorUserId: number;
  plan: string[];
  happend: string[];
  teamId: number | null;
}): Promise<{
  message: string;
  result: boolean;
  teamName?: string;
}> => {
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
