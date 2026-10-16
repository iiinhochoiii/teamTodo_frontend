import { useQuery } from 'react-query';
import { teamService } from '@/apis/services';
import * as queryKeys from '@/constants/queryKeys';

// TEAM_DATA 하위 키로 두어 팀 mutation 의 invalidateQueries(TEAM_DATA) 시 함께 갱신되도록 함
export const teamDetailQueryKey = (teamName: string) =>
  [queryKeys.TEAM_DATA, 'detail', teamName] as const;

const useTeamDetailData = (teamName: string) => {
  return useQuery(
    teamDetailQueryKey(teamName),
    () => teamService.getTeamsByName(teamName),
    {
      enabled: !!teamName,
    }
  );
};

export default useTeamDetailData;
