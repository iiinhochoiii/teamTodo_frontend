import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from '@/apis/user';
import { createUser, checkEmail, login } from '@/apis/auth';
import { useRouter } from 'next/router';
import { setToken } from '@/utils/token';

const useUserMutation = () => {
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateMutaion = useMutation(
    (params: {
      name?: string;
      phone?: string;
      position?: string;
      profile?: string;
      password?: string;
    }) => updateUser(params),
    {
      onSuccess: (res) => {
        if (res.result) {
          alert(res?.message || '정보가 변경되었습니다.');
          queryClient.invalidateQueries('users');
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
      return createUser({
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

  const checkEmailMutation = useMutation((email: string) => checkEmail(email), {
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
  });

  const loginMutation = useMutation(
    (form: { email: string; password: string }) => login(form),
    {
      onSuccess: (data: { status: boolean; token: string } | void) => {
        const { status, token } = data as {
          status: boolean;
          token: string;
        };
        if (status) {
          setToken(token);

          if (router.query?.redirect) {
            router.push(String(router.query.redirect));
          } else {
            router.push('/dashboard');
          }
        }
      },
      onError: (err: any) => {
        const { message, error } = err.response.data;
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
