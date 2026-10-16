import React from 'react';
import { Box, Text } from '@/components/atoms';
import * as S from './style';
import { TeamDirectoryCard } from '@/components/organisms';
import { TeamDirectoryCardSkeleton } from '@/components/molecules';
import Skeleton from '@mui/material/Skeleton';
import useTeamMutation from '@/queries/team/useTeamMutation';
import useTeamsData from '@/queries/team/useTeamsData';
import { useUserStore } from '@/stores/useUserStore';

const TeamDirectoryComponent = () => {
  const { user } = useUserStore();
  const { data, isLoading } = useTeamsData();
  const { deleteMutation } = useTeamMutation();

  if (isLoading) {
    return (
      <S.Container>
        <Box sx={{ margin: '20px 0 0 0' }}>
          <Skeleton variant="text" width={220} height={36} />
          <Skeleton variant="text" width={90} />
        </Box>
        <TeamDirectoryCardSkeleton />
      </S.Container>
    );
  }

  if (!data) {
    return <></>;
  }

  return (
    <S.Container>
      <Box sx={{ margin: '20px 0 0 0' }}>
        <S.Title>{`${user?.name}'s WorkSpace`}</S.Title>
        <Text font={{ size: 'M', weight: 300 }}>WorkSpace</Text>
      </Box>
      {data.map((team) => (
        <TeamDirectoryCard
          key={team.id}
          team={team}
          isDeleting={
            deleteMutation.isLoading && deleteMutation.variables === team.id
          }
          deleteTeam={(id: number) => deleteMutation.mutate(id)}
        />
      ))}
    </S.Container>
  );
};

export default TeamDirectoryComponent;
