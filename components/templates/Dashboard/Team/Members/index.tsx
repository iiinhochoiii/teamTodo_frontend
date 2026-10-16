import React from 'react';
import * as S from './style';
import { TeamMembersCard, TeamMembersInviteItem } from '@/components/organisms';
import { TeamMemberCardSkeleton } from '@/components/molecules';
import useTeamName from '@/hooks/useTeamName';
import useTeamDetailData from '@/queries/team/useTeamDetailData';
import { useUserStore } from '@/stores/useUserStore';

const TeamMembersComponent = () => {
  const teamName = useTeamName();
  const { data: team, isLoading } = useTeamDetailData(teamName);
  const { user } = useUserStore();

  return (
    <S.Container>
      <S.StyledContent>
        {isLoading && <TeamMemberCardSkeleton />}
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
