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

interface FormProps {
  email: string;
  password: string;
}

const SignUpComponent = () => {
  const { register, handleSubmit } = useForm<FormProps>();
  const { mutate } = useMutation(login);

  const submit = (form: FormProps): void => {
    mutate(form, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
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
