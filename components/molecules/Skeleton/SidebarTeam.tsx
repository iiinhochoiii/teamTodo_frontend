import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import * as S from './style';

interface Props {
  count?: number;
}

const SidebarTeamSkeleton = ({ count = 3 }: Props) => {
  return (
    <div aria-busy="true" aria-label="팀 목록 불러오는 중">
      {Array.from({ length: count }, (_, i) => (
        <S.SidebarTeamRow key={i}>
          <Skeleton variant="rectangular" width={24} height={24} />
          <Skeleton variant="text" width="60%" sx={{ marginLeft: '10px' }} />
        </S.SidebarTeamRow>
      ))}
    </div>
  );
};

export default SidebarTeamSkeleton;
