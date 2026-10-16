import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import * as S from './style';

interface Props {
  count?: number;
  // 첫 로딩에는 날짜 헤더(h2)까지 표시, 다음 페이지 로딩에는 카드만 표시
  withDate?: boolean;
}

const ContentCardSkeleton = ({ count = 3, withDate = true }: Props) => {
  return (
    <div aria-busy="true" aria-label="작성한 글 불러오는 중">
      {withDate && (
        <Skeleton variant="text" width={140} height={40} sx={{ mb: 2 }} />
      )}
      {Array.from({ length: count }, (_, i) => (
        <S.ContentCard key={i}>
          <S.Row>
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="text" width={120} sx={{ marginLeft: '10px' }} />
          </S.Row>
          <Skeleton variant="text" width="30%" sx={{ mt: 2 }} />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="75%" />
          <Skeleton variant="text" width="30%" sx={{ mt: 2 }} />
          <Skeleton variant="text" width="85%" />
        </S.ContentCard>
      ))}
    </div>
  );
};

export default ContentCardSkeleton;
