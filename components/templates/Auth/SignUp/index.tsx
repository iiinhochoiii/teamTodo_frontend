import React, { useState } from 'react';
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
import { useQuery, useMutation } from 'react-query';
import { checkEmail, createUser } from '@/apis/auth';
import { useRouter } from 'next/router';

interface FormProps {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
}

const SignUpComponent = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<FormProps>();
  const [isValidEmail, setIsValidEmail] = useState(false);

  const { refetch } = useQuery('checkEmail', () => checkEmail(watch('email')), {
    enabled: false,
    onSuccess: (res) => {
      setIsValidEmail(res?.result);
      if (res?.message) {
        alert(res?.message);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const createMutation = useMutation(
    (form: FormProps) => {
      const { email, name, password, phone } = form;
      return createUser({
        email,
        name,
        password,
        phone,
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
  const submit = (form: FormProps) => {
    const { email, name, password, passwordConfirm, phone } = form;
    if (!email || !name || !phone || !password || !passwordConfirm) {
      alert('정보를 입력해주세요.');
      return;
    }

    if (!isValidEmail) {
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
                readonly={isValidEmail}
              />
              <Button
                sx={{ margin: '10px 0 0 20px' }}
                onClick={() => {
                  if (watch('email')) {
                    refetch();
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

          <FormSubmit type="submit" value="회원가입" />
        </Form>
      </S.StyledSignUpContent>
    </S.StyledSignUpContainer>
  );
};

export default SignUpComponent;
