import React, { useEffect } from 'react';
import * as S from './style';
import { Form, FormInput, FormSubmit } from '@/components/atoms';
import { useForm } from 'react-hook-form';
import useUserMutation from '@/hooks/queries/user/useUserMutation';
import useUsersData from '@/hooks/queries/user/useUsersData';

interface FormProps {
  email: string;
  position: string;
  name: string;
  phone: string;
}

const ProfileInformationContent = () => {
  const { register, handleSubmit, reset } = useForm<FormProps>();
  const { updateMutaion } = useUserMutation();
  const { data: user } = useUsersData();

  useEffect(() => {
    if (user) {
      const { email, name, phone, position } = user;

      reset({
        email,
        name,
        phone,
        position,
      });
    }
  }, [user]);

  const update = (form: FormProps) => {
    const { name, phone, position } = form;

    if (!name && !phone && !position) {
      alert('정보를 입력해주세요.');
      return;
    }

    const params = {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(position && { position }),
    };

    updateMutaion.mutate(params);
  };

  return (
    <S.Container>
      <S.Content>
        <S.HeaderText>Information</S.HeaderText>
        <Form onSubmit={handleSubmit(update)}>
          <FormInput type="text" {...register('email')} readonly />
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
