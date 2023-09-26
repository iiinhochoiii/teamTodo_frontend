import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  checkTeam,
  createTeam,
  deleteTeam,
  updateTeam,
  inviteTeam,
  distoryMember,
  unSubscribe,
} from '@/apis/team';
import { useRouter } from 'next/router';
import * as queryKeys from '@/constants/queryKeys';
import { AxiosError } from 'axios';

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
    (params: { name: string; maskcot: string; emails?: string[] }) =>
      createTeam(params),
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
        queryClient.invalidateQueries(queryKeys.TEAM_DATA);
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
        queryClient.invalidateQueries(queryKeys.TEAM_DATA);
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

  const inviteTeamMutation = useMutation(
    (params: { teamId: number; emails: string[] }) => inviteTeam(params),
    {
      onSuccess: (res) => {
        const { message, result } = res;

        alert(message || '초대 되었습니다.');
        if (result) {
          queryClient.invalidateQueries(queryKeys.TEAM_DATA);
        }
      },
      onError: (
        err: AxiosError<{
          statusCode: number;
          error: string;
          message: string;
        }>
      ) => {
        alert(
          err?.response?.data.message ||
            '팀 초대 요청 중 오류가 발생하였습니다.'
        );
        console.log(err);
      },
    }
  );

  const distroyMemberMutation = useMutation(
    (params: { teamId: number; userId: number }) => distoryMember(params),
    {
      onSuccess: (res) => {
        const { result } = res;

        if (result) {
          queryClient.invalidateQueries(queryKeys.TEAM_DATA);
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const unSubscribeMutation = useMutation(
    (teamId: number) => unSubscribe(teamId),
    {
      onSuccess: (data) => {
        const { result, message } = data;

        alert(message || '팀에서 나가기가 완료 되었습니다.');
        if (result) {
          queryClient.invalidateQueries(queryKeys.TEAM_DATA);
          router.push('/dashboard/team/directory');
        }
      },
      onError: (err) => {
        console.log(err);
        alert('팀 삭제중 오류가 발생하였습니다.');
      },
    }
  );

  return {
    isValid,
    checkTeamMutation,
    createMutaion,
    deleteMutation,
    updateTeamMutation,
    inviteTeamMutation,
    distroyMemberMutation,
    unSubscribeMutation,
  };
};

export default useTeamMutation;
