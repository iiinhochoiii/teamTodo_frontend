import React, { useEffect } from 'react';
import * as S from './style';
import { Form, FormInput, FormSubmit } from '@/components/atoms';
import { useQuery } from 'react-query';
import { getMy } from '@/apis/user';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from '@/apis/user';

interface FormProps {
  email: string;
  position: string;
  name: string;
  phone: string;
}

const ProfileInformationContent = () => {
  const { register, handleSubmit, reset } = useForm<FormProps>();
  const queryClient = useQueryClient();

  const { data: user } = useQuery('users', () => getMy());

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

  const updateMutaion = useMutation(
    (params: { name?: string; phone?: string; position?: string }) =>
      updateUser(params),
    {
      onSuccess: (res) => {
        if (res.result) {
          alert(res?.message || '정보가 변경되었습니다.');
          queryClient.invalidateQueries('users');
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
