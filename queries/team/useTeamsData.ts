import { useQuery } from 'react-query';
import { teamService } from '@/apis/services';
import * as queryKeys from '@/constants/queryKeys';

const useTeamsData = () => {
  return useQuery(queryKeys.TEAM_DATA, teamService.getTeams);
};

export default useTeamsData;
