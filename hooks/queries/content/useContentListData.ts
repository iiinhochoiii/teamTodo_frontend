import { useInfiniteQuery } from 'react-query';
import { getContent } from '@/apis/content';

interface OptionProps {
  options?: {
    enabled?: boolean;
  };
}

const useContentListData = (pageSize: number, { options }: OptionProps) => {
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
        if (data.contents.page?.hasNext) {
          return data.nextPage;
        }
      },
      ...options,
    }
  );
};

export default useContentListData;
