import React from 'react';
import * as S from './style';
import {
  Box,
  Flex,
  Text,
  Form,
  FormInput,
  Button,
  FormSubmit,
} from '@/components/atoms';

import { useForm } from 'react-hook-form';
import useUserMutation from '@/hooks/queries/user/useUserMutation';

interface FormProps {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  position?: string;
}

const SignUpComponent = () => {
  const { isValid, createMutation, checkEmailMutation } = useUserMutation();
  const { register, handleSubmit, watch } = useForm<FormProps>();

  const submit = (form: FormProps) => {
    const { email, name, password, passwordConfirm, phone } = form;
    if (!email || !name || !phone || !password || !passwordConfirm) {
      alert('정보를 입력해주세요.');
      return;
    }

    if (!isValid) {
      alert('이메일 중복확인을 해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    createMutation.mutate(form);
  };

  return (
    <S.StyledSignUpContainer>
      <S.StyledSignUpContent>
        <S.StyledHeaderText>회원가입</S.StyledHeaderText>
        <Form onSubmit={handleSubmit(submit)}>
          <Box sx={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>이메일</Text>
            <Flex>
              <FormInput
                type="text"
                placeholder="이메일을 입력해주세요."
                {...register('email')}
                readonly={isValid}
              />
              <Button
                sx={{ margin: '10px 0 0 20px' }}
                onClick={() => {
                  if (watch('email')) {
                    checkEmailMutation.mutate(watch('email'));
                  } else {
                    alert('이메일을 입력해주세요.');
                  }
                }}
              >
                중복 확인
              </Button>
            </Flex>
          </Box>
          <Box sx={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>비밀번호/확인</Text>
            <FormInput
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password')}
            />
            <FormInput
              type="password"
              placeholder="비밀번호 중복 확인을 해주세요."
              {...register('passwordConfirm')}
            />
          </Box>
          <Box sx={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>이름</Text>
            <FormInput
              type="text"
              placeholder="이름을 입력해주세요."
              {...register('name')}
            />
          </Box>
          <Box sx={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>전화번호</Text>
            <FormInput
              type="text"
              placeholder="전화번호를 입력해주세요."
              {...register('phone')}
            />
          </Box>

          <Box sx={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>직책</Text>
            <FormInput
              type="text"
              placeholder="직책을 입력해주세요."
              {...register('position')}
            />
          </Box>

          <FormSubmit type="submit" value="회원가입" />
        </Form>
      </S.StyledSignUpContent>
    </S.StyledSignUpContainer>
  );
};

export default SignUpComponent;
