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
import useUsersMutation from '@/queries/user/useUserMutation';

interface FormProps {
  email: string;
  password: string;
}

const SignInComponent = () => {
  const { register, handleSubmit } = useForm<FormProps>();
  const { loginMutation } = useUsersMutation();

  // 로그인 성공 후 대시보드로 이동이 끝날 때까지도 로딩 상태 유지 (중복 클릭 방지)
  const isPending =
    loginMutation.isLoading ||
    (loginMutation.isSuccess && !!loginMutation.data?.status);

  const submit = (form: FormProps): void => {
    if (isPending) return;
    loginMutation.mutate(form);
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
          <FormSubmit
            type="submit"
            value={isPending ? '로그인 중...' : '로그인'}
            disabled={isPending}
            aria-busy={isPending}
          />
        </Form>
        <S.StyledBottomTextWrap>
          <p>비밀번호 찾기</p>
          <Link
            href="/auth/signup"
            font={{ size: 'S', weight: 200 }}
            style={{ margin: '0 0 0 10px' }}
          >
            회원가입
          </Link>
        </S.StyledBottomTextWrap>
      </S.StyledSignInContent>
    </S.StyledSignInContainer>
  );
};

export default SignInComponent;
