import { useQuery } from 'react-query';
import { getTeams } from '@/apis/team';

const useTeamsData = () => {
  return useQuery('teams', getTeams);
};

export default useTeamsData;
