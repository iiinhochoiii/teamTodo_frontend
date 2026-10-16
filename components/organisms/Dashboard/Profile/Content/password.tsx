import React from 'react';
import * as S from './style';
import { Form, FormInput, FormSubmit, PendingBar } from '@/components/atoms';
import { useForm } from 'react-hook-form';
import useUserMutation from '@/queries/user/useUserMutation';

interface FormProps {
  password: string;
  passwordConfirm: string;
}

const ProfilePassowrdContent = () => {
  const { register, handleSubmit, reset } = useForm<FormProps>();
  const { updateMutaion } = useUserMutation();
  // 내 정보 재조회까지 끝날 때까지 pending 유지 (useUserMutation 참고)
  const isPending = updateMutaion.isLoading;

  const submit = (form: FormProps) => {
    if (isPending) return;

    const { password, passwordConfirm } = form;

    if (!password || !passwordConfirm) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 입력값은 요청이 끝난 뒤 비움 (변경 중에는 입력한 상태를 그대로 보여줌)
    updateMutaion.mutate(
      { password },
      {
        onSettled: () =>
          reset({
            password: '',
            passwordConfirm: '',
          }),
      }
    );
  };

  return (
    <S.Container>
      <S.Content>
        <S.HeaderText>Password Settings</S.HeaderText>
        <Form onSubmit={handleSubmit(submit)} aria-busy={isPending}>
          {isPending && (
            <PendingBar style={{ borderRadius: '10px 10px 0 0' }} />
          )}
          <FormInput
            type="password"
            placeholder="비밀번호를 입력해주세요."
            readonly={isPending}
            {...register('password')}
          />

          <FormInput
            type="password"
            placeholder="비밀번호 중복 확인을 해주세요."
            readonly={isPending}
            {...register('passwordConfirm')}
          />

          <FormSubmit
            type="submit"
            value={isPending ? '변경 중...' : '비밀번호 변경'}
            disabled={isPending}
            aria-busy={isPending}
          />
        </Form>
      </S.Content>
    </S.Container>
  );
};

export default ProfilePassowrdContent;
