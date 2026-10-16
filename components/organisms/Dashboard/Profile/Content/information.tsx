import React, { useEffect } from 'react';
import * as S from './style';
import { Form, FormInput, FormSubmit, PendingBar } from '@/components/atoms';
import { useForm } from 'react-hook-form';
import useUserMutation from '@/queries/user/useUserMutation';
import useUsersData from '@/queries/user/useUsersData';

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
  // 내 정보 재조회까지 끝날 때까지 pending 유지 (useUserMutation 참고)
  const isPending = updateMutaion.isLoading;

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
    if (isPending) return;

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
        <Form onSubmit={handleSubmit(update)} aria-busy={isPending}>
          {isPending && (
            <PendingBar style={{ borderRadius: '10px 10px 0 0' }} />
          )}
          <FormInput type="text" {...register('email')} readonly />
          <FormInput
            type="text"
            placeholder="직책을 입력해주세요."
            readonly={isPending}
            {...register('position')}
          />
          <FormInput
            type="text"
            placeholder="이름을 입력해주세요."
            readonly={isPending}
            {...register('name')}
          />
          <FormInput
            type="text"
            placeholder="전화번호를 입력해주세요."
            readonly={isPending}
            {...register('phone')}
          />

          <FormSubmit
            type="submit"
            value={isPending ? '변경 중...' : '정보 변경'}
            disabled={isPending}
            aria-busy={isPending}
          />
        </Form>
      </S.Content>
    </S.Container>
  );
};

export default ProfileInformationContent;
