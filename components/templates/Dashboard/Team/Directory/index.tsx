import React, { useContext } from 'react';
import { Box, Text } from '@/components/atoms';
import * as S from './style';
import { TeamDirectoryCard } from '@/components/organisms';
import { AppContext } from '@/contexts';
import useTeamMutation from '@/hooks/queries/team/useTeamMutation';
import useTeamsData from '@/hooks/queries/team/useTeamsData';

const TeamDirectoryComponent = () => {
  const { user } = useContext(AppContext);
  const { data } = useTeamsData();
  const { deleteMutation } = useTeamMutation();

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
          deleteTeam={(id: number) => deleteMutation.mutate(id)}
        />
      ))}
    </S.Container>
  );
};

export default TeamDirectoryComponent;
