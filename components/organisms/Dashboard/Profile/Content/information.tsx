import React, { useEffect } from 'react';
import * as S from './style';
import { Form, FormInput, FormSubmit } from '@/components/atoms';
import { useQuery } from 'react-query';
import { getMy } from '@/apis/user';
import { useForm } from 'react-hook-form';

interface FormProps {
  email: string;
  position: string;
  name: string;
  phone: string;
}

const ProfileInformationContent = () => {
  const { register, handleSubmit, reset } = useForm<FormProps>();

  const { data: user } = useQuery('users', () => getMy());

  useEffect(() => {
    if (user) {
      const { email, name, phone } = user;

      reset({
        email,
        name,
        phone,
      });
    }
  }, [user]);

  const update = (form: FormProps) => {
    console.log(form);
  };

  return (
    <S.Container>
      <S.Content>
        <S.HeaderText>Information</S.HeaderText>
        <Form onSubmit={handleSubmit(update)}>
          <FormInput
            type="text"
            placeholder="직책을 입력해주세요."
            {...register('position')}
          />
          <FormInput
            type="text"
            placeholder="이름을 입력해주세요."
            {...register('name')}
          />
          <FormInput
            type="text"
            placeholder="전화번호를 입력해주세요."
            {...register('phone')}
          />

          <FormSubmit type="submit" value="정보 변경" />
        </Form>
      </S.Content>
    </S.Container>
  );
};

export default ProfileInformationContent;
