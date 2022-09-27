import React, { useContext } from 'react';
import { Box, Text } from '@/components/atoms';
import * as S from './style';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTeams, deleteTeam } from '@/apis/team';
import { TeamDirectoryCard } from '@/components/organisms';
import { AppContext } from '@/contexts';

const TeamDirectoryComponent = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AppContext);
  const { data } = useQuery('teams', getTeams);

  const deleteMutation = useMutation((id: number) => deleteTeam(id), {
    onSuccess: (data) => {
      const { result, message } = data;

      alert(message || '삭제 되었습니다.');
      if (result) {
        queryClient.invalidateQueries('teams');
      }
    },
    onError: (err) => {
      console.log(err);
      alert('팀 삭제중 오류가 발생하였습니다.');
    },
  });

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
