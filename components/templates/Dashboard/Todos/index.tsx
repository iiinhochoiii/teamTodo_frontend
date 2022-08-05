import React from 'react';
import * as S from './style';
import { DashboardCard } from '@/components/organisms';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { updateContent, deleteContent } from '@/apis/content';
import { getContent } from '@/apis/content';

const TodosComponent = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery('contents', getContent, {
    refetchInterval: false,
  });

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

export default TodosComponent;
