import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import * as S from './style';
import { Button, Text, Form, FormSubmit, PendingBar } from '@/components/atoms';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useForm, Controller } from 'react-hook-form';
import { Team } from '@/types/team';
import useTeamMutation from '@/queries/team/useTeamMutation';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'create' | 'invite';
  team?: Team;
  callbackFn?: (email: string[]) => void;
}

interface FormType {
  emails: string[];
  teamId: number;
}

const InviteDialog = (props: Props) => {
  const { isOpen, setIsOpen, type, team, callbackFn } = props;
  const { inviteTeamMutation } = useTeamMutation();
  const isInviting = inviteTeamMutation.isLoading;

  // 초대 요청 중에는 바깥 클릭·닫기 버튼으로 닫히지 않도록 함
  const closeDialog = () => {
    if (isInviting) return;
    setIsOpen(false);
  };
  const { register, handleSubmit, reset, watch, control } = useForm<FormType>({
    defaultValues: {
      emails: ['', '', ''],
      teamId: team?.id || 0,
    },
  });

  const submitHandler = (form: FormType) => {
    if (isInviting) return;

    const { teamId, emails } = form;

    const userEmails = emails.filter((email) => email);

    if (userEmails.length === 0) {
      alert('이메일을 입력하지 않았습니다.');
      return;
    }

    if (team) {
      // 멤버 목록 재조회까지 끝난 뒤 닫힘 (useTeamMutation 의 onSuccess 이후 실행)
      inviteTeamMutation.mutate(
        {
          teamId,
          emails: userEmails,
        },
        { onSuccess: () => setIsOpen(false) }
      );
    } else {
      if (callbackFn) {
        callbackFn(userEmails);
      }
    }
  };

  return (
    <S.StyledDialog onClose={closeDialog} open={isOpen}>
      {isInviting && <PendingBar />}
      <S.StyledDialogTitleWrap>
        <S.Title>Invite People</S.Title>
        <Text font={{ size: 'S', weight: '400' }} color="gray">
          팀원을 초대하여, Todo를 공유해보세요.
        </Text>
        <Button
          onClick={closeDialog}
          disabled={isInviting}
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
        <S.StyledDialogContentWrap
          $isPending={isInviting}
          aria-busy={isInviting}
        >
          <Text sx={{ margin: '0 0 15px 0' }}>Email address</Text>
          {watch('emails')?.map((_, index) => (
            <S.StyledContentEmail
              key={index}
              type="text"
              placeholder="Example Name <name@example.com>"
              {...register(`emails.${index}`)}
            />
          ))}
          <Button
            onClick={() =>
              reset({
                emails: [...watch('emails'), ''],
              })
            }
          >
            Add another email
          </Button>

          <Text sx={{ margin: '30px 0 15px 0' }}>Select team</Text>
          <S.StyledContentTeam>
            <S.StyledFormControl focused={false}>
              <Controller
                name="teamId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    displayEmpty
                    onChange={onChange}
                    value={team?.id || value}
                    disabled={type === 'invite'}
                  >
                    <MenuItem value={0}>
                      <em>No team selected</em>
                    </MenuItem>
                    {team && <MenuItem value={team?.id}>{team?.name}</MenuItem>}
                  </Select>
                )}
              />
            </S.StyledFormControl>
          </S.StyledContentTeam>
        </S.StyledDialogContentWrap>
        <S.StyledDialogFooterWrap>
          <FormSubmit
            type="submit"
            value={isInviting ? '초대 중...' : 'Send invite'}
            disabled={isInviting}
            aria-busy={isInviting}
          />
        </S.StyledDialogFooterWrap>
      </Form>
    </S.StyledDialog>
  );
};

export default InviteDialog;
