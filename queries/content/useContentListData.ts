import { useInfiniteQuery } from 'react-query';
import { contentService } from '@/apis/services';
import * as queryKeys from '@/constants/queryKeys';

const useContentListData = (pageSize: number) => {
  return useInfiniteQuery(
    [queryKeys.CONTENT_DATA, 'my'],
    async ({ pageParam = 1 }) => {
      const contents = await contentService.getContent({
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
        const { contents, nextPage } = data;
        return contents.page?.hasNext ? nextPage : undefined;
      },
      refetchInterval: false,
    }
  );
};

export default useContentListData;
