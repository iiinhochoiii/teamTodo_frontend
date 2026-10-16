import React from 'react';
import * as S from './style';
import { Box } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useUsersData from '@/queries/user/useUsersData';

interface Props {
  title?: string;
  header?: React.ReactNode;
}

const DashboardHeader = (props: Props) => {
  const { title, header } = props;
  const router = useRouter();
  const { data: user } = useUsersData();

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <Box>
          {header ? header : <S.HeaderText>{title || ''}</S.HeaderText>}
        </Box>
        <S.HeaderBadge
          onClick={() => {
            router.push(`/dashboard/profile/information`);
          }}
        >
          {user?.profile ? <p>{user?.profile}</p> : <AccountCircleIcon />}
        </S.HeaderBadge>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default DashboardHeader;
