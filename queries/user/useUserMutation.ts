import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { authService, userService } from '@/apis/services';
import { useRouter, useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { setToken } from '@/utils/token';
import { waitForPaint } from '@/utils/paint';
import * as queryKeys from '@/constants/queryKeys';

const useUserMutation = () => {
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const updateMutaion = useMutation(
    (params: {
      name?: string;
      phone?: string;
      position?: string;
      profile?: string;
      password?: string;
    }) => userService.updateUser(params),
    {
      // 내 정보 재조회까지 끝난 뒤 알림 (onSuccess 가 끝날 때까지 mutation 은 pending 유지)
      // → 프로필 이모지 등 변경 결과가 화면에 반영된 상태에서 완료 처리
      onSuccess: async (res, params) => {
        if (res.result) {
          // 비밀번호만 바꾼 경우 화면에 보이는 정보는 그대로라 다른 목록은 갱신하지 않음
          const isPasswordOnly = Object.keys(params).every(
            (key) => key === 'password'
          );

          if (!isPasswordOnly) {
            // 팀 멤버 목록(teams)과 글 목록(contents)에도 사용자 이름·이모지 등이 포함되어 있으므로 함께 갱신.
            // 지금 화면에 없는 캐시도 바로 다시 받아와서, 다른 화면으로 이동했을 때 이전 정보가 보이지 않도록 함
            queryClient.invalidateQueries(queryKeys.TEAM_DATA, {
              refetchInactive: true,
            });
            queryClient.invalidateQueries(queryKeys.CONTENT_DATA, {
              refetchInactive: true,
            });
          }

          await queryClient.invalidateQueries(queryKeys.USER_DATA);
          await waitForPaint();
          alert(res?.message || '정보가 변경되었습니다.');
        }
      },
      onError: () => {
        console.log('err');
      },
    }
  );

  const createMutation = useMutation(
    (form: {
      email: string;
      password: string;
      passwordConfirm: string;
      name: string;
      phone: string;
      position?: string;
    }) => {
      const { email, name, password, phone, position } = form;
      return authService.createUser({
        email,
        name,
        password,
        phone,
        position,
      });
    },
    {
      onSuccess: (res) => {
        if (res?.result) {
          router.push('/auth/signin');
        } else {
          alert(res?.message || '회원가입 중 오류가 발생하였습니다.');
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const checkEmailMutation = useMutation(
    (email: string) => authService.checkEmail(email),
    {
      onSuccess: (res) => {
        setIsValid(res?.result);
        if (res?.message) {
          alert(res?.message);
        }
      },
      onError: (err) => {
        setIsValid(false);
        console.log(err);
      },
    }
  );

  const loginMutation = useMutation(
    (form: { email: string; password: string }) => authService.login(form),
    {
      onSuccess: (data: { status: boolean; token: string } | void) => {
        const { status, token } = data as {
          status: boolean;
          token: string;
        };
        if (status) {
          setToken(token);

          // 이전 계정의 데이터가 남지 않도록 react-query 캐시와 Next 라우터 캐시를 비운 뒤 이동
          // (로그아웃 없이 다른 계정으로 로그인하는 경우 대비)
          queryClient.clear();
          router.refresh();

          const redirect = searchParams.get('redirect');
          if (redirect) {
            router.push(redirect);
          } else {
            router.push('/dashboard');
          }
        }
      },
      onError: (err: AxiosError<{ message?: string; error?: string }>) => {
        const { message, error } = err.response?.data ?? {};
        console.log(message || error);
        alert(message || error);
      },
    }
  );

  return {
    isValid,
    updateMutaion,
    createMutation,
    checkEmailMutation,
    loginMutation,
  };
};

export default useUserMutation;
