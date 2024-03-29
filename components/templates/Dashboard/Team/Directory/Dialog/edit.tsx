import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as S from './style';
import { Button, Text, Form, FormSubmit, Flex, Box } from '@/components/atoms';
import { useForm } from 'react-hook-form';
import { Team } from '@/interfaces/models/team';
import { EMPTY_TEAM_MASKCOT } from '@/constants/emoji';
import { IEmojiData } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import useTeamMutation from '@/hooks/queries/team/useTeamMutation';

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

  const { register, handleSubmit, reset, watch } = useForm<FormType>({
    defaultValues: {
      teamName: team.name,
      description: team?.description,
      maskcot: team?.maskcot || EMPTY_TEAM_MASKCOT,
    },
  });

  const submitHandler = (form: FormType) => {
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
      updateTeamMutation.mutate(params);
      setIsOpen(false);
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
    <S.StyledDialog onClose={() => setIsOpen(false)} open={isOpen}>
      <S.StyledDialogTitleWrap>
        <S.Title>Edit team</S.Title>
        <Text font={{ size: 'S', weight: '400' }} color="gray">
          Change team info for your organization
        </Text>
        <Button
          onClick={() => setIsOpen(false)}
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
        <S.StyledDialogContentWrap>
          <Text sx={{ margin: '0 0 15px 0' }}>Team name</Text>
          <Flex>
            <S.StyledContentTeamName {...register('teamName')} />
            {team.name !== watch('teamName') && (
              <Button
                sx={{ margin: '0 0 0 15px', height: '45px' }}
                background="purple"
                onClick={() => {
                  checkTeamMutation.mutate(watch('teamName'));
                }}
              >
                중복확인
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
          <FormSubmit type="submit" value="Save" />
          <Button
            onClick={() => {
              if (window.confirm('삭제 하시겠습니까?')) {
                deleteMutation.mutate(team.id);
              }
            }}
          >
            Delete team
          </Button>
        </S.StyledDialogFooterWrap>
      </Form>
    </S.StyledDialog>
  );
};

export default EditDialog;
