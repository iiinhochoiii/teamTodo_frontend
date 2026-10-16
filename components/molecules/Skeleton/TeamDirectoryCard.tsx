import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import * as S from './style';

interface Props {
  count?: number;
}

const TeamDirectoryCardSkeleton = ({ count = 3 }: Props) => {
  return (
    <div aria-busy="true" aria-label="팀 목록 불러오는 중">
      {Array.from({ length: count }, (_, i) => (
        <S.DirectoryItem key={i}>
          <Skeleton
            variant="rectangular"
            style={{ borderRadius: 6 }}
            width={30}
            height={30}
          />
          <div style={{ margin: '0 0 0 30px', flex: 1, maxWidth: 500 }}>
            <Skeleton variant="text" width="40%" height={28} />
            <Skeleton variant="text" width="25%" />
            <Skeleton variant="text" width="70%" />
          </div>
          <Skeleton
            variant="rectangular"
            style={{ borderRadius: 6 }}
            width={120}
            height={36}
          />
        </S.DirectoryItem>
      ))}
    </div>
  );
};

export default TeamDirectoryCardSkeleton;
