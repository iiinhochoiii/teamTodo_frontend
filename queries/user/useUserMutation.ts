import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { authService, userService } from '@/apis/services';
import { useRouter, useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { setToken } from '@/utils/token';
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
      onSuccess: (res) => {
        if (res.result) {
          alert(res?.message || '정보가 변경되었습니다.');
          queryClient.invalidateQueries(queryKeys.USER_DATA);
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
