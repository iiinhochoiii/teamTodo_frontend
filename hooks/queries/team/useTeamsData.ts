import { useQuery } from 'react-query';
import { getTeams } from '@/apis/team';
import * as queryKeys from '@/constants/queryKeys';

const useTeamsData = () => {
  return useQuery(queryKeys.TEAM_DATA, getTeams);
};

export default useTeamsData;
