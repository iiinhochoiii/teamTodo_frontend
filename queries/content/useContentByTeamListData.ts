import { useInfiniteQuery, useQueryClient } from 'react-query';
import { contentService, teamService } from '@/apis/services';
import * as queryKeys from '@/constants/queryKeys';
import { teamDetailQueryKey } from '@/queries/team/useTeamDetailData';

interface OptionProps {
  pageSize: number;
  teamName: string;
  options?: {
    enabled?: boolean;
  };
}

const useContentByTeamListData = ({
  pageSize,
  teamName,
  options,
}: OptionProps) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery(
    [queryKeys.CONTENT_DATA, teamName],
    async ({ pageParam = 1 }) => {
      // 팀 id 는 팀 상세 쿼리 캐시에서 가져옴 → TeamHeader 의 같은 요청과 합쳐지고,
      // 다음 페이지 조회 때도 /teams/{name} 을 다시 호출하지 않음
      const team = await queryClient.fetchQuery(
        teamDetailQueryKey(teamName),
        () => teamService.getTeamsByName(teamName)
      );
      const contents = await contentService.getContentByTeamId(team.id, {
        page: pageParam,
        pageSize,
      });

      return {
        contents,
        nextPage: pageParam + 1,
      };
    },
    {
      getNextPageParam: (data) => {
        if (data.contents.page?.hasNext) {
          return data.nextPage;
        }
      },
      ...options,
    }
  );
};

export default useContentByTeamListData;
