import axios from '@/utils/axios';
import { Team } from '@/interfaces/models/team';

export const getTeams = async (): Promise<Team[]> => {
  const res = await axios.get('/teams');

  return res.data.data;
};

export const getTeamsByName = async (teamName: string): Promise<Team> => {
  const res = await axios.get(`/teams/${teamName}`);

  return res.data.data;
};

export const checkTeam = async (name: string) => {
  const res = await axios.get(`/teams/checkTeam/${name}`);

  return res.data;
};

export const createTeam = async (params: {
  name: string;
  maskcot: string;
  emails?: string[];
}) => {
  const { name, maskcot, emails } = params;

  const res = await axios.post('/teams', {
    name,
    maskcot,
  });

  if (emails && emails.length > 0) {
    inviteTeam({ teamId: res.data.data.id, emails });
  }
  return res.data;
};

export const updateTeam = async (params: {
  id: number;
  name?: string;
  maskcot?: string;
  description?: string;
}) => {
  const res = await axios.put('/teams', params);

  return res.data;
};

export const deleteTeam = async (id: number) => {
  const res = await axios.delete(`/teams/${id}`);

  return res.data;
};

export const inviteTeam = async (params: {
  teamId: number;
  emails: string[];
}) => {
  const res = await axios.post('/teams/invite', params);

  return res.data;
};
