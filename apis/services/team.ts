import { defaultInstance } from '@/apis/instances/defaultInstance';
import { Team } from '@/types/team';

const getTeams = async (): Promise<Team[]> => {
  const res = await defaultInstance.get('/teams');

  return res.data.data;
};

const getTeamsByName = async (teamName: string): Promise<Team> => {
  const res = await defaultInstance.get(`/teams/${teamName}`);

  return res.data.data;
};

const checkTeam = async (name: string) => {
  const res = await defaultInstance.get(`/teams/checkTeam/${name}`);

  return res.data;
};

const createTeam = async (params: {
  name: string;
  maskcot: string;
  emails?: string[];
}) => {
  const { name, maskcot, emails } = params;

  const res = await defaultInstance.post('/teams', {
    name,
    maskcot,
  });

  if (emails && emails.length > 0) {
    inviteTeam({ teamId: res.data.data.id, emails });
  }
  return res.data;
};

const updateTeam = async (params: {
  id: number;
  name?: string;
  maskcot?: string;
  description?: string;
}) => {
  const res = await defaultInstance.put('/teams', params);

  return res.data;
};

const deleteTeam = async (id: number) => {
  const res = await defaultInstance.delete(`/teams/${id}`);

  return res.data;
};

const inviteTeam = async (params: { teamId: number; emails: string[] }) => {
  const res = await defaultInstance.post('/teams/invite', params);

  return res.data;
};

const distoryMember = async (params: { teamId: number; userId: number }) => {
  const res = await defaultInstance.post('/teams/distroy', params);

  return res.data;
};

const unSubscribe = async (teamId: number) => {
  const res = await defaultInstance.delete(`/teams/unsubscribe/${teamId}`);

  return res.data;
};

export const teamService = {
  getTeams,
  getTeamsByName,
  checkTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  inviteTeam,
  distoryMember,
  unSubscribe,
};
