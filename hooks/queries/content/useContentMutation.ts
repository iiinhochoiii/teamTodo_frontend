import { useMutation, useQueryClient } from 'react-query';
import { deleteContent, updateContent, createContent } from '@/apis/content';
import { useRouter } from 'next/router';
import * as queryKeys from '@/constants/queryKeys';

const useContentMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const removeMutation = useMutation((id: number) => deleteContent(id), {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.CONTENT_DATA),
    onError: () => {
      console.log('err');
    },
  });

  // addItem, updateItem, removeItem
  const updateMutation = useMutation(
    (data: { id: number; plan: string[]; happend: string[] }) =>
      updateContent(data),
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
    }) => createContent(content),
    {
      onSuccess: (result) => {
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
