import React, { useEffect } from 'react';
import { DashboardCard } from '@/components/organisms';
import * as S from './style';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getContentByTeam, updateContent, deleteContent } from '@/apis/content';
import { useRouter } from 'next/router';

const TeamHomeComponent = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery(
    'contents',
    () => getContentByTeam(String(router.query.id)),
    {
      enabled: !!router.query.id,
    }
  );

  useEffect(() => {
    refetch();
  }, [router]);

  // remove Card
  const removeMutation = useMutation((id: number) => deleteContent(id), {
    onSuccess: () => queryClient.invalidateQueries('contents'),
    onError: () => {
      console.log('err');
    },
  });

  // addItem, updateItem, removeItem
  const updateMutation = useMutation(
    (data: { id: number; plan: string[]; happend: string[] }) =>
      updateContent(data),
    {
      onSuccess: () => queryClient.invalidateQueries('contents'),
      onError: () => {
        console.log('err');
      },
    }
  );

  if (!data) return <></>;

  return (
    <S.Container>
      {data.map((item) => (
        <DashboardCard
          key={item.id}
          item={item}
          remove={(id: number) => {
            if (window.confirm('작성하신 내용을 삭제하시겠습니까?')) {
              removeMutation.mutate(id);
            }
          }}
          update={(data: { id: number; plan: string[]; happend: string[] }) =>
            updateMutation.mutate(data)
          }
        />
      ))}
    </S.Container>
  );
};

export default TeamHomeComponent;
