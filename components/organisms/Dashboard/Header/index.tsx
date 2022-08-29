import React, { useContext } from 'react';
import * as S from './style';
import { Box } from '@/components/atoms';
import { useRouter } from 'next/router';
import { AppContext } from '@/contexts';

interface Props {
  title?: string;
  header?: React.ReactNode;
}

const DashboardHeader = (props: Props) => {
  const { title, header } = props;
  const router = useRouter();
  const { user } = useContext(AppContext);

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <Box width={'auto'}>
          {header ? header : <S.HeaderText>{title || ''}</S.HeaderText>}
        </Box>
        <S.HeaderBadge
          onClick={() => {
            router.push(`/dashboard/profile/${user?.id}`);
          }}
        />
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default DashboardHeader;
