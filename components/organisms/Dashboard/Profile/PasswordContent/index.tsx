import React from 'react';
import * as S from './style';
import { Form, FormInput, FormSubmit } from '@/components/atoms';
import { useForm } from 'react-hook-form';

interface FormProps {
  password: string;
  passwordConfirm: string;
}

const ProfilePassowrdContent = () => {
  const { register, handleSubmit } = useForm<FormProps>();

  const submit = (form: FormProps) => {
    console.log(form);
  };

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
