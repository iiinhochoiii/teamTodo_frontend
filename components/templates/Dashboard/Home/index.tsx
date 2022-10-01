import React, { useMemo } from 'react';
import { DashboardCard } from '@/components/organisms';
import * as S from './style';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useContentListData from '@/hooks/queries/content/useContentListData';
import useContentMutation from '@/hooks/queries/content/useContentMutation';

const DashBoardComponent = () => {
  const { removeMutation, updateMutation } = useContentMutation();

  const { data, hasNextPage, isFetching, fetchNextPage } =
    useContentListData(10);

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

export default DashBoardComponent;
