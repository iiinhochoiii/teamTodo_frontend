import React from 'react';
import {
  StyledSignInContainer,
  StyledSignInContent,
  StyledHeaderText,
} from './style';
import {
  Box,
  Text,
  Form,
  FormInput,
  FormSubmit,
  Link,
} from '@/components/atoms';

import { useForm } from 'react-hook-form';

interface FormProps {
  email: string;
  password: string;
}

const SignUpComponent = () => {
  const { register, handleSubmit } = useForm<FormProps>();

  const submit = (data: FormProps) => {
    console.log(data);
  };

  return (
    <StyledSignInContainer>
      <StyledSignInContent>
        <StyledHeaderText>로그인</StyledHeaderText>
        <Form onSubmit={handleSubmit(submit)}>
          <Box style={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>이메일</Text>
            <FormInput
              type="text"
              placeholder="이메일을 입력해주세요."
              {...register('email')}
            />
          </Box>
          <Box style={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>비밀번호</Text>
            <FormInput
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password')}
            />
          </Box>
          <FormSubmit type="submit" value="로그인" />
        </Form>
        <Box style={{ margin: '20px 0 0 0' }}>
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
      </StyledSignInContent>
    </StyledSignInContainer>
  );
};

export default SignUpComponent;
