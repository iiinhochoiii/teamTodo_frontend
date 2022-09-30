import React, { useEffect, useMemo } from 'react';
import { DashboardCard } from '@/components/organisms';
import * as S from './style';
import { useMutation, useQueryClient } from 'react-query';
import { updateContent, deleteContent } from '@/apis/content';
import { useRouter } from 'next/router';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useContentByTeamListData from '@/hooks/queries/content/useContentByTeamListData';

const TeamHomeComponent = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useContentByTeamListData({
      pageSize: 10,
      teamName: String(router.query.id),
      options: {
        enabled: !!router.query.id,
      },
    });

  const contents = useMemo(
    () => (data ? data.pages.flatMap((data) => data.contents.data) : []),
    [data]
  );

  const ref = useInfiniteScroll(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

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

export default TeamHomeComponent;
