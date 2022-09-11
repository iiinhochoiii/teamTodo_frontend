import React from 'react';
import * as S from './style';
import { Form, FormInput, FormSubmit } from '@/components/atoms';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from '@/apis/user';

interface FormProps {
  password: string;
  passwordConfirm: string;
}

const ProfilePassowrdContent = () => {
  const { register, handleSubmit, reset } = useForm<FormProps>();
  const queryClient = useQueryClient();

  const submit = (form: FormProps) => {
    const { password, passwordConfirm } = form;

    if (!password || !passwordConfirm) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    updateMutaion.mutate(password);
  };

  const updateMutaion = useMutation(
    (password: string) => updateUser({ password }),
    {
      onSuccess: (res) => {
        if (res.result) {
          alert(res?.message || '비밀번호가 변경되었습니다.');
          queryClient.invalidateQueries('users');
          reset({
            password: '',
            passwordConfirm: '',
          });
        }
      },
      onError: () => {
        console.log('err');
      },
    }
  );

  return (
    <S.Container>
      <S.Content>
        <S.HeaderText>Password Settings</S.HeaderText>
        <Form onSubmit={handleSubmit(submit)}>
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

          <FormSubmit type="submit" value="비밀번호 변경" />
        </Form>
      </S.Content>
    </S.Container>
  );
};

export default ProfilePassowrdContent;
