import React from 'react';
import * as S from './style';
import {
  Box,
  Text,
  Form,
  FormInput,
  FormSubmit,
  Link,
} from '@/components/atoms';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/apis/auth';
import { setToken } from '@/utils/token';
import { useRouter } from 'next/router';

interface FormProps {
  email: string;
  password: string;
}

const SignUpComponent = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormProps>();
  const { mutate } = useMutation(login);

  const submit = (form: FormProps): void => {
    mutate(form, {
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
    });
  };

  return (
    <S.StyledSignInContainer>
      <S.StyledSignInContent>
        <S.StyledHeaderText>로그인</S.StyledHeaderText>
        <Form onSubmit={handleSubmit(submit)}>
          <Box sx={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>이메일</Text>
            <FormInput
              type="text"
              placeholder="이메일을 입력해주세요."
              {...register('email')}
            />
          </Box>
          <Box sx={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>비밀번호</Text>
            <FormInput
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password')}
              enabled
            />
          </Box>
          <FormSubmit type="submit" value="로그인" />
        </Form>
        <Box sx={{ margin: '20px 0 0 0' }}>
          <Link href="/auth/password-reset" font={{ size: 'S', weight: 200 }}>
            비밀번호 찾기
          </Link>
          <Link
            href="/auth/signup"
            font={{ size: 'S', weight: 200 }}
            style={{ margin: '0 0 0 10px' }}
          >
            회원가입
          </Link>
        </Box>
      </S.StyledSignInContent>
    </S.StyledSignInContainer>
  );
};

export default SignUpComponent;
