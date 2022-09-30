import { useInfiniteQuery } from 'react-query';
import { getContentByTeam } from '@/apis/content';

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
  return useInfiniteQuery(
    'contents',
    async ({ pageParam = 1 }) => {
      const contents = await getContentByTeam(teamName, {
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
