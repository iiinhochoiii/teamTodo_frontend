import React from 'react';
import * as S from './style';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Text } from '@/components/atoms';

interface Props {
  member: {
    id: number;
    name: string;
    status: string;
    plan?: string;
    happend?: string;
  };
}

const TeamMembersCard = (props: Props) => {
  const { member } = props;

  return (
    <S.StyledWrap>
      <S.StyledHeader>
        <S.HeaderBadge>
          <AccountBoxIcon />
        </S.HeaderBadge>
        <S.HeaderContent>
          <Text>{member.name}</Text>
        </S.HeaderContent>
      </S.StyledHeader>
    </S.StyledWrap>
  );
};

export default TeamMembersCard;
