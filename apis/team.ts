import axios from '@/utils/axios';
import { Team } from '@/interfaces/models/team';

export const getTeams = async (): Promise<Team[]> => {
  const res = await axios.get('/teams');

  return res.data.data;
};
