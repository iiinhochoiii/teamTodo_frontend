import { defaultInstance } from '@/apis/instances/defaultInstance';
import { responseContent } from '@/types/content';

const getContent = async (pageOption: {
  page: number;
  pageSize: number;
}): Promise<responseContent> => {
  const res = await defaultInstance.get('/contents', {
    params: {
      ...pageOption,
    },
  });
  return res.data;
};

const getContentByTeamId = async (
  teamId: number,
  pageOption: {
    page: number;
    pageSize: number;
  }
): Promise<responseContent> => {
  const res = await defaultInstance.get(`/contents/${teamId}`, {
    params: {
      ...pageOption,
    },
  });
  return res.data;
};

const createContent = async (content: {
  creatorUserId: number;
  plan: string[];
  happend: string[];
  teamId: number | null;
}): Promise<{
  message: string;
  result: boolean;
  teamName?: string;
}> => {
  const res = await defaultInstance.post('/contents', content);

  return res.data;
};

const updateContent = async (content: {
  id: number;
  plan: string[];
  happend: string[];
}): Promise<void> => {
  const res = await defaultInstance.put('/contents', content);

  return res.data;
};

const deleteContent = async (id: number) => {
  const res = await defaultInstance.delete(`/contents/${id}`);

  return res.data;
};

export const contentService = {
  getContent,
  getContentByTeamId,
  createContent,
  updateContent,
  deleteContent,
};
