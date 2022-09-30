import React, { useMemo } from 'react';
import { DashboardCard } from '@/components/organisms';
import * as S from './style';
import { useMutation, useQueryClient } from 'react-query';
import { updateContent, deleteContent } from '@/apis/content';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useContentListData from '@/hooks/queries/content/useContentListData';

const DashBoardComponent = () => {
  const queryClient = useQueryClient();

  const { data, hasNextPage, isFetching, fetchNextPage } = useContentListData(
    10,
    {}
  );

  const ref = useInfiniteScroll(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const contents = useMemo(
    () => (data ? data.pages.flatMap((data) => data.contents.data) : []),
    [data]
  );

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

  if (isFetching) {
    return <div>정보를 불러오는중 입니다.</div>;
  }

  return (
    <S.Container>
      {contents.map((item) => (
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
      {hasNextPage && <div ref={ref} />}
    </S.Container>
  );
};

export default DashBoardComponent;
