import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { checkTeam, createTeam, deleteTeam, updateTeam } from '@/apis/team';
import { useRouter } from 'next/router';

const useTeamMutation = (isRefresh?: boolean) => {
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const checkTeamMutation = useMutation((name: string) => checkTeam(name), {
    onSuccess: (data) => {
      const { result, message } = data;

      if (message) {
        alert(message);
      }

      setIsValid(result);
    },
    onError: (err) => {
      setIsValid(false);
      console.log(err);
    },
  });

  const createMutaion = useMutation(
    (params: { name: string; maskcot: string }) => createTeam(params),
    {
      onSuccess: (data) => {
        const { result, message } = data;

        if (message) {
          alert(message);
        }

        if (result) {
          router.push('/dashboard/team/directory');
        }
      },
      onError: (err) => {
        console.log(err);
        alert('팀 생성중 오류가 발생하였습니다.');
      },
    }
  );

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

  const updateTeamMutation = useMutation(
    (params: {
      id: number;
      name?: string;
      maskcot?: string;
      description?: string;
    }) => updateTeam(params),
    {
      onSuccess: (response) => {
        const { message, data } = response;

        alert(message || '정보가 변경되었습니다.');
        queryClient.invalidateQueries('teams');
        if (isRefresh && router.query.id !== data.name) {
          const path =
            router.pathname.split('/')[router.pathname.split('/').length - 1];
          router.push(`/dashboard/team/${data.name}/${path}`);
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  return {
    isValid,
    checkTeamMutation,
    createMutaion,
    deleteMutation,
    updateTeamMutation,
  };
};

export default useTeamMutation;
