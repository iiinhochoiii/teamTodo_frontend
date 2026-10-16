import { useMutation, useQueryClient } from 'react-query';
import { contentService } from '@/apis/services';
import { useRouter } from 'next/navigation';
import * as queryKeys from '@/constants/queryKeys';

const useContentMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const removeMutation = useMutation(
    (id: number) => contentService.deleteContent(id),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.CONTENT_DATA),
      onError: () => {
        console.log('err');
      },
    }
  );

  // addItem, updateItem, removeItem
  const updateMutation = useMutation(
    (data: { id: number; plan: string[]; happend: string[] }) =>
      contentService.updateContent(data),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.CONTENT_DATA),
      onError: () => {
        console.log('err');
      },
    }
  );

  const createMutation = useMutation(
    (content: {
      creatorUserId: number;
      plan: string[];
      happend: string[];
      teamId: number | null;
    }) => contentService.createContent(content),
    {
      // 이동할 목록을 먼저 새로 받아온 뒤 이동해야 생성 전 목록이 잠깐 보이지 않음.
      // (onSuccess 가 끝날 때까지 mutation 이 pending 으로 유지되어 등록 중 효과도 함께 유지됨)
      onSuccess: async (result) => {
        const targetKey = result.teamName
          ? [queryKeys.CONTENT_DATA, result.teamName]
          : [queryKeys.CONTENT_DATA, 'my'];

        // 다른 글 목록은 stale 처리만 해두고 다음 진입 시 재조회
        await queryClient.invalidateQueries(queryKeys.CONTENT_DATA, {
          refetchActive: false,
        });
        // 이동할 목록은 캐시가 있으면 지금 재조회 (캐시가 없으면 이동 후 스켈레톤 → 조회)
        await queryClient.refetchQueries(targetKey, { exact: true });

        if (result.teamName) {
          router.push(`/dashboard/team/${result.teamName}/home`);
        } else {
          router.push('/dashboard');
        }
      },
      onError: () => {
        console.log('error');
      },
    }
  );
  return { removeMutation, updateMutation, createMutation };
};

export default useContentMutation;
