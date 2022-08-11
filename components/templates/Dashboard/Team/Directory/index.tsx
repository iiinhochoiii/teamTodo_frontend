import React from 'react';
import { Box, Text } from '@/components/atoms';
import * as S from './style';
import { useQuery } from 'react-query';
import { getTeams } from '@/apis/team';
import { TeamDirectoryCard } from '@/components/organisms';

const TeamDirectoryComponent = () => {
  const { data } = useQuery('teams', getTeams);

  if (!data) {
    return <></>;
  }

  return (
    <S.Container>
      <Box sx={{ margin: '20px 0 0 0' }}>
        <S.Title>{`dlsgh120's WorkSpace`}</S.Title>
        <Text font={{ size: 'M', weight: 300 }}>WorkSpace</Text>
      </Box>
      {data.map((team) => (
        <TeamDirectoryCard key={team.id} team={team} />
      ))}
    </S.Container>
  );
};

export default TeamDirectoryComponent;
