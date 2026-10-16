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
import { usePathname, useRouter } from 'next/navigation';
import useTeamName from '@/hooks/useTeamName';
import * as queryKeys from '@/constants/queryKeys';
import { AxiosError } from 'axios';
import { waitForPaint } from '@/utils/paint';

const useTeamMutation = (isRefresh?: boolean) => {
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const teamName = useTeamName();
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
      // 팀 목록(사이드바·Directory)을 새로 받아온 뒤 이동해야 새 팀이 바로 보임
      onSuccess: async (data) => {
        const { result, message } = data;

        if (result) {
          await queryClient.invalidateQueries(queryKeys.TEAM_DATA);
          await waitForPaint();
        }

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
    // 목록에서 사라진 것을 확인한 뒤 알림 (onSuccess 동안 pending 유지)
    onSuccess: async (data) => {
      const { result, message } = data;

      if (result) {
        await queryClient.invalidateQueries(queryKeys.TEAM_DATA);
        await waitForPaint();
      }
      alert(message || '삭제 되었습니다.');
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
      // 팀 목록 재조회까지 끝난 뒤 완료 처리 (onSuccess 가 끝날 때까지 mutation 은 pending 유지)
      // → 모달이 닫힐 때 WorkSpace 목록이 이미 최신 상태
      onSuccess: async (response) => {
        const { message, data } = response;

        await queryClient.invalidateQueries(queryKeys.TEAM_DATA);
        await waitForPaint();
        alert(message || '정보가 변경되었습니다.');
        if (isRefresh && teamName !== data.name) {
          const path = pathname.split('/')[pathname.split('/').length - 1];
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
      // 응답의 result 값과 관계없이 멤버 목록을 다시 받아온 뒤 알림
      // (이전에는 result 가 true 일 때만, 기다리지 않고 재조회해서 목록 반영이 늦거나 누락됨)
      onSuccess: async (res) => {
        const { message } = res;

        await queryClient.invalidateQueries(queryKeys.TEAM_DATA);
        await waitForPaint();
        alert(message || '초대 되었습니다.');
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
      // 멤버 목록 재조회까지 pending 유지 → 카드가 사라질 때까지 내보내는 중 표시
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKeys.TEAM_DATA);
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
