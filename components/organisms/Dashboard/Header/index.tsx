import React from 'react';
import * as S from './style';
import { Box } from '@/components/atoms';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  header?: React.ReactNode;
}

const DashboardHeader = (props: Props) => {
  const { title, header } = props;
  const router = useRouter();

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <Box width={'auto'}>
          {header ? header : <S.HeaderText>{title || ''}</S.HeaderText>}
        </Box>
        <S.HeaderBadge
          onClick={() => {
            router.push(`/dashboard/profile`);
          }}
        />
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default DashboardHeader;
