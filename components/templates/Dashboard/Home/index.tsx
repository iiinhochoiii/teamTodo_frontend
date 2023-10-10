import React, { useMemo } from 'react';
import { DashboardCard } from '@/components/organisms';
import * as S from './style';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useContentListData from '@/hooks/queries/content/useContentListData';
import useContentMutation from '@/hooks/queries/content/useContentMutation';
import { groupContent } from '@/utils/contents';

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

  const dateGroups = groupContent(contents);

  return (
    <S.Container>
      {Object.keys(dateGroups).map((date) => (
        <div key={date}>
          <h2>{date}</h2> {/* 대표 날짜 표시 */}
          {dateGroups[date].map((item) => (
            <DashboardCard
              key={item.id}
              item={item}
              remove={(id: number) => {
                if (window.confirm('작성하신 내용을 삭제하시겠습니까?')) {
                  removeMutation.mutate(id);
                }
              }}
              update={(data: {
                id: number;
                plan: string[];
                happend: string[];
              }) => updateMutation.mutate(data)}
            />
          ))}
        </div>
      ))}
      {hasNextPage && <div ref={ref} />}
    </S.Container>
  );
};

export default DashBoardComponent;
