import React from 'react';
import * as S from './style';
import { TeamMembersCard, TeamMembersInviteItem } from '@/components/organisms';
import { useQuery } from 'react-query';
import { getTeamsByName } from '@/apis/team';
import { useRouter } from 'next/router';
import { useUserStore } from '@/stores/useUserStore';

const TeamMembersComponent = () => {
  const router = useRouter();
  const { data: team } = useQuery('teamDetail', () =>
    getTeamsByName(String(router.query.id))
  );
  const { user } = useUserStore();

  return (
    <S.Container>
      <S.StyledContent>
        {team?.members.map((item) => (
          <TeamMembersCard
            key={item.id}
            member={item}
            creatorId={team.creatorUserId}
          />
        ))}
        {user?.id === team?.creatorUserId && (
          <TeamMembersInviteItem team={team} />
        )}
      </S.StyledContent>
    </S.Container>
  );
};

export default TeamMembersComponent;
