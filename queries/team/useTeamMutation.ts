import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { teamService } from '@/apis/services';
import { usePathname, useRouter } from 'next/navigation';
import useTeamName from '@/hooks/useTeamName';
import * as queryKeys from '@/constants/queryKeys';
import { AxiosError } from 'axios';
import { waitForPaint } from '@/utils/paint';
import { Team } from '@/types/team';
import { teamDetailQueryKey } from './useTeamDetailData';

const useTeamMutation = (isRefresh?: boolean) => {
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const teamName = useTeamName();
  const queryClient = useQueryClient();

  // 팀 상세·팀 글 목록 캐시는 팀 이름을 키로 쓰므로, 팀이 삭제되거나 이름이 바뀌면 이전 이름의 캐시가 남음.
  // 이후 같은 이름의 팀이 생기면 이전 팀의 데이터가 잠깐 보일 수 있어 제거
  // (팀 목록 갱신 전에 호출해야 id 로 이전 이름을 찾을 수 있음.
  //  지금 화면에서 쓰는 캐시는 제거하면 바로 다시 요청하므로 제외 → 화면을 벗어나면 cacheTime 후 정리됨)
  const removeTeamNameCache = (teamId: number) => {
    const teamName = queryClient
      .getQueryData<Team[]>(queryKeys.TEAM_DATA)
      ?.find((team) => team.id === teamId)?.name;

    if (!teamName) return;

    queryClient.removeQueries(teamDetailQueryKey(teamName), {
      exact: true,
      inactive: true,
    });
    queryClient.removeQueries([queryKeys.CONTENT_DATA, teamName], {
      exact: true,
      inactive: true,
    });
  };

  const checkTeamMutation = useMutation(
    (name: string) => teamService.checkTeam(name),
    {
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
    }
  );

  const createMutaion = useMutation(
    (params: { name: string; maskcot: string; emails?: string[] }) =>
      teamService.createTeam(params),
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

  const deleteMutation = useMutation(
    (id: number) => teamService.deleteTeam(id),
    {
      // 목록에서 사라진 것을 확인한 뒤 알림 (onSuccess 동안 pending 유지)
      onSuccess: async (data, id) => {
        const { result, message } = data;

        if (result) {
          removeTeamNameCache(id);
          await queryClient.invalidateQueries(queryKeys.TEAM_DATA);
          await waitForPaint();
        }
        alert(message || '삭제 되었습니다.');
      },
      onError: (err) => {
        console.log(err);
        alert('팀 삭제중 오류가 발생하였습니다.');
      },
    }
  );

  const updateTeamMutation = useMutation(
    (params: {
      id: number;
      name?: string;
      maskcot?: string;
      description?: string;
    }) => teamService.updateTeam(params),
    {
      // 팀 목록 재조회까지 끝난 뒤 완료 처리 (onSuccess 가 끝날 때까지 mutation 은 pending 유지)
      // → 모달이 닫힐 때 WorkSpace 목록이 이미 최신 상태
      onSuccess: async (response, params) => {
        const { message, data } = response;

        if (params.name) {
          removeTeamNameCache(params.id);
        }
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
    (params: { teamId: number; emails: string[] }) =>
      teamService.inviteTeam(params),
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
    (params: { teamId: number; userId: number }) =>
      teamService.distoryMember(params),
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
    (teamId: number) => teamService.unSubscribe(teamId),
    {
      onSuccess: (data, teamId) => {
        const { result, message } = data;

        alert(message || '팀에서 나가기가 완료 되었습니다.');
        if (result) {
          removeTeamNameCache(teamId);
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
