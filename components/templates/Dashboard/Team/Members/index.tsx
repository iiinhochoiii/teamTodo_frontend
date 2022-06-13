import React from 'react';
import * as S from './style';
import { TeamMembersCard, TeamMembersInviteItem } from '@/components/organisms';

const TeamMembersComponent = () => {
  const data = [
    {
      id: 1,
      name: 'inho choi',
      status: 'Last write todo in 3days ago',
      plan: 'test',
      happend: '',
    },
    {
      id: 2,
      name: 'inho choi2',
      status: 'Last write todo in 1days ago',
      plan: 'this is plan',
      happend: 'this is happend',
    },
  ];
  return (
    <S.Container>
      <S.StyledContent>
        {data.map((item) => (
          <TeamMembersCard key={item.id} member={item} />
        ))}
        <TeamMembersInviteItem />
      </S.StyledContent>
    </S.Container>
  );
};

export default TeamMembersComponent;
