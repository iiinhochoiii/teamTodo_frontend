import { useInfiniteQuery } from 'react-query';
import { getContent } from '@/apis/content';

const useContentListData = (pageSize: number) => {
  return useInfiniteQuery(
    'contents',
    async ({ pageParam = 1 }) => {
      const contents = await getContent({ page: pageParam, pageSize });

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
