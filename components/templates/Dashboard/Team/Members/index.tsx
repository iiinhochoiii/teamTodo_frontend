import React from 'react';
import * as S from './style';
import { TeamMembersCard } from '@/components/organisms';

const TeamMembersComponent = () => {
  const data = [
    {
      id: 1,
      name: 'inho choi',
      status: 'Last write todo in 3days ago',
      plan: 'test',
      happend: '',
    },
  ];
  return (
    <S.Container>
      <S.StyledContent>
        {data.map((item) => (
          <TeamMembersCard key={item.id} member={item} />
        ))}
      </S.StyledContent>
    </S.Container>
  );
};

export default TeamMembersComponent;
