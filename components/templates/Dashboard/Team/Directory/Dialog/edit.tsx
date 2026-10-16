import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import * as S from './style';
import {
  Button,
  Text,
  Form,
  FormSubmit,
  Flex,
  Box,
  PendingBar,
  PendingLabel,
} from '@/components/atoms';
import { useForm } from 'react-hook-form';
import { Team } from '@/types/team';
import { EMPTY_TEAM_MASKCOT } from '@/constants/emoji';
import { IEmojiData } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import useTeamMutation from '@/queries/team/useTeamMutation';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  team: Team;
  isRefresh?: boolean;
}

interface FormType {
  teamName: string;
  description?: string;
  maskcot?: string;
}

const EditDialog = (props: Props) => {
  const { isOpen, setIsOpen, team, isRefresh } = props;
  const [isEmoji, setIsEmoji] = useState(false);
  const { isValid, checkTeamMutation, deleteMutation, updateTeamMutation } =
    useTeamMutation(isRefresh);

  const isChecking = checkTeamMutation.isLoading;
  const isSaving = updateTeamMutation.isLoading;
  const isDeleting = deleteMutation.isLoading;
  const isPending = isSaving || isDeleting;

  const { register, handleSubmit, reset, watch } = useForm<FormType>({
    defaultValues: {
      teamName: team.name,
      description: team?.description,
      maskcot: team?.maskcot || EMPTY_TEAM_MASKCOT,
    },
  });

  // 저장·삭제 중에는 바깥 클릭·닫기 버튼으로 닫히지 않도록 함
  const closeDialog = () => {
    if (isPending) return;
    setIsOpen(false);
  };

  const submitHandler = (form: FormType) => {
    if (isPending || isChecking) return;

    const { teamName, maskcot, description } = form;
    let validate;

    if (team.name !== teamName) {
      if (isValid) {
        validate = true;
      } else {
        validate = false;
      }
    } else {
      validate = true;
    }

    if (validate) {
      const params = {
        id: team.id,
        maskcot: maskcot,
        description: description,
        ...(team.name !== teamName && { name: teamName }),
      };
      // 팀 목록 재조회까지 끝난 뒤 닫힘 (useTeamMutation 의 onSuccess 이후 실행)
      updateTeamMutation.mutate(params, {
        onSuccess: () => setIsOpen(false),
      });
    } else {
      alert('팀 이름 중복확인이 되지 않았습니다.');
    }
  };

  const onEmojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    data: IEmojiData
  ) => {
    reset({
      ...watch(),
      maskcot: data.emoji,
    });
    setIsEmoji(false);
  };

  return (
    <S.StyledDialog onClose={closeDialog} open={isOpen}>
      {isPending && <PendingBar color={isDeleting ? 'red' : 'purple'} />}
      <S.StyledDialogTitleWrap>
        <S.Title>Edit team</S.Title>
        <Text font={{ size: 'S', weight: '400' }} color="gray">
          Change team info for your organization
        </Text>
        <Button
          onClick={closeDialog}
          disabled={isPending}
          background="white"
          font={{ color: 'gray' }}
          size="S"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </Button>
      </S.StyledDialogTitleWrap>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <S.StyledDialogContentWrap $isPending={isPending} aria-busy={isPending}>
          <Text sx={{ margin: '0 0 15px 0' }}>Team name</Text>
          <Flex>
            <S.StyledContentTeamName {...register('teamName')} />
            {team.name !== watch('teamName') && (
              <Button
                sx={{
                  margin: '0 0 0 15px',
                  height: '45px',
                  ...(isChecking && { opacity: 0.7, cursor: 'progress' }),
                }}
                background="purple"
                disabled={isChecking}
                aria-busy={isChecking}
                onClick={() => {
                  checkTeamMutation.mutate(watch('teamName'));
                }}
              >
                {isChecking ? (
                  <PendingLabel>확인 중...</PendingLabel>
                ) : (
                  '중복확인'
                )}
              </Button>
            )}
          </Flex>
          <Text sx={{ margin: '30px 0 5px 0' }}>Team maskcot</Text>
          <Text
            font={{ size: 'S', weight: '400' }}
            sx={{ margin: '0 0 30px 0' }}
            color="gray"
          >
            An emoji to represent your team.
          </Text>
          <S.StyledContentMascot>
            <Box width={'auto'} sx={{ fontSize: '32px' }}>
              {watch('maskcot')}
            </Box>
            <Button type="button" onClick={() => setIsEmoji(!isEmoji)}>
              Edit
            </Button>
            {isEmoji && <Picker onEmojiClick={onEmojiClick} />}
          </S.StyledContentMascot>
          <Text sx={{ margin: '30px 0 5px 0' }}>Description</Text>
          <Text
            font={{ size: 'S', weight: '400' }}
            sx={{ margin: '0 0 30px 0' }}
            color="gray"
          >
            Write a sentence or two about the work this team does.
          </Text>
          <S.StyledContentTextarea {...register('description')} />
        </S.StyledDialogContentWrap>
        <S.StyledDialogFooterWrap>
          <FormSubmit
            type="submit"
            value={isSaving ? '저장 중...' : 'Save'}
            disabled={isPending || isChecking}
            aria-busy={isSaving}
          />
          <Button
            disabled={isPending}
            aria-busy={isDeleting}
            sx={isDeleting ? { cursor: 'progress' } : undefined}
            onClick={() => {
              if (window.confirm('삭제 하시겠습니까?')) {
                // 목록 재조회 후 이 카드(와 모달)가 목록에서 사라짐
                deleteMutation.mutate(team.id, {
                  onSuccess: () => setIsOpen(false),
                });
              }
            }}
          >
            {isDeleting ? (
              <PendingLabel color="#d72b3f">삭제 중...</PendingLabel>
            ) : (
              'Delete team'
            )}
          </Button>
        </S.StyledDialogFooterWrap>
      </Form>
    </S.StyledDialog>
  );
};

export default EditDialog;
