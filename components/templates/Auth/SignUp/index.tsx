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

interface FormProps {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
}

const SignUpComponent = () => {
  const { register, handleSubmit } = useForm<FormProps>();

  const submit = (data: FormProps) => {
    console.log(data);
  };

  return (
    <S.StyledSignUpContainer>
      <S.StyledSignUpContent>
        <S.StyledHeaderText>회원가입</S.StyledHeaderText>
        <Form onSubmit={handleSubmit(submit)}>
          <Box style={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>이메일</Text>
            <Flex>
              <FormInput
                type="text"
                placeholder="이메일을 입력해주세요."
                {...register('email')}
              />
              <Button style={{ margin: '10px 0 0 20px' }}>중복 확인</Button>
            </Flex>
          </Box>
          <Box style={{ margin: '30px 0 0 0' }}>
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
          <Box style={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>이름</Text>
            <FormInput
              type="text"
              placeholder="이름을 입력해주세요."
              {...register('name')}
            />
          </Box>
          <Box style={{ margin: '30px 0 0 0' }}>
            <Text font={{ size: 'S', weight: 300 }}>전화번호</Text>
            <FormInput
              type="text"
              placeholder="전화번호를 입력해주세요."
              {...register('phone')}
            />
          </Box>

          <FormSubmit type="submit" value="회원가입" />
        </Form>
      </S.StyledSignUpContent>
    </S.StyledSignUpContainer>
  );
};

export default SignUpComponent;
