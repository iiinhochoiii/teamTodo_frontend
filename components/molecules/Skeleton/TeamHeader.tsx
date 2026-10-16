import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import * as S from './style';

const TeamHeaderSkeleton = () => {
  return (
    <div aria-busy="true" aria-label="팀 정보 불러오는 중">
      <Skeleton variant="text" width={200} />
      <S.Row style={{ margin: '15px 0' }}>
        <Skeleton variant="rectangular" width={36} height={36} />
        <Skeleton
          variant="text"
          width={160}
          height={36}
          sx={{ marginLeft: '10px' }}
        />
      </S.Row>
      <S.Row>
        <Skeleton
          variant="rectangular"
          style={{ borderRadius: 6 }}
          width={64}
          height={28}
        />
        <Skeleton
          variant="rectangular"
          style={{ borderRadius: 6 }}
          width={80}
          height={28}
          sx={{ marginLeft: '8px' }}
        />
      </S.Row>
    </div>
  );
};

export default TeamHeaderSkeleton;
