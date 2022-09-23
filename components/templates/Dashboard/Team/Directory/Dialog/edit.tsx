import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as S from './style';
import { Button, Text, Form, FormSubmit, Flex, Box } from '@/components/atoms';
import { useForm } from 'react-hook-form';
import { Team } from '@/interfaces/models/team';
import { EMPTY_TEAM_MASKCOT } from '@/constants/emoji';
import { IEmojiData } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import { useMutation, useQueryClient } from 'react-query';
import { checkTeam, updateTeam, deleteTeam } from '@/apis/team';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [isEmoji, setIsEmoji] = useState(false);
  const [isValidTeamName, setIsValidTeamName] = useState(false);
  const queryClient = useQueryClient();

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
      if (isValidTeamName) {
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

  const checkTeamMutation = useMutation(() => checkTeam(watch('teamName')), {
    onSuccess: (data) => {
      const { result, message } = data;

      if (message) {
        alert(message);
      }
      setIsValidTeamName(result);
    },
    onError: (err) => {
      setIsValidTeamName(false);
      console.log(err);
    },
  });

  const updateTeamMutation = useMutation(
    (params: {
      id: number;
      name?: string;
      maskcot?: string;
      description?: string;
    }) => updateTeam(params),
    {
      onSuccess: (response) => {
        const { result, message, data } = response;
        if (result) {
          setIsOpen(false);
        }

        alert(message || '정보가 변경되었습니다.');
        queryClient.invalidateQueries('teams');
        if (isRefresh && router.query.id !== data.name) {
          const path =
            router.pathname.split('/')[router.pathname.split('/').length - 1];
          router.push(`/dashboard/team/${data.name}/${path}`);
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const deleteMutation = useMutation((id: number) => deleteTeam(id), {
    onSuccess: (data) => {
      const { result, message } = data;

      if (result) {
        alert(message || '삭제 되었습니다.');
        setIsOpen(false);
        queryClient.invalidateQueries('teams');
        router.push('/dashboard/team/directory');
      }
    },
    onError: (err) => {
      console.log(err);
      alert('팀 삭제중 오류가 발생하였습니다.');
    },
  });

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
                  checkTeamMutation.mutate();
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
