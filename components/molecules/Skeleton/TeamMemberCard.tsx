import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import * as S from './style';

interface Props {
  count?: number;
}

const TeamMemberCardSkeleton = ({ count = 4 }: Props) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <S.MemberCard key={i} aria-busy="true" aria-label="멤버 불러오는 중">
          <S.Row>
            <Skeleton
              variant="rectangular"
              style={{ borderRadius: 6 }}
              width={76}
              height={76}
            />
            <div style={{ marginLeft: 24, flex: 1 }}>
              <Skeleton variant="text" width="50%" height={28} />
              <Skeleton variant="text" width="35%" />
              <Skeleton variant="text" width="25%" />
            </div>
          </S.Row>
          <Skeleton variant="text" width="30%" sx={{ mt: 3 }} />
          <Skeleton variant="text" width="60%" />
        </S.MemberCard>
      ))}
    </>
  );
};

export default TeamMemberCardSkeleton;
