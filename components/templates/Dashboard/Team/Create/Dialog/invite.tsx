import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as S from './style';
import { Button, Text, Form, FormSubmit } from '@/components/atoms';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useForm, Controller } from 'react-hook-form';
import { Team } from '@/interfaces/models/team';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'create' | 'invite';
  team?: Team;
}

interface FormType {
  emails: string[];
  message?: string;
  teamId: number;
}

const InviteDialog = (props: Props) => {
  const { isOpen, setIsOpen, type, team } = props;
  const { register, handleSubmit, reset, watch, control } = useForm<FormType>({
    defaultValues: {
      emails: ['', '', ''],
      message: '',
      teamId: team?.id || 0,
    },
  });

  const submitHandler = (form: FormType) => {
    console.log(form);
  };

  return (
    <S.StyledDialog onClose={() => setIsOpen(false)} open={isOpen}>
      <S.StyledDialogTitleWrap>
        <S.Title>Invite People</S.Title>
        <Text font={{ size: 'S', weight: '400' }} color="gray">
          팀원을 초대하여, Todo를 공유해보세요.
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
          <Text sx={{ margin: '30px 0 15px 0' }}>Message</Text>
          <S.StyledContentTextarea {...register('message')} />
        </S.StyledDialogContentWrap>
        <S.StyledDialogFooterWrap>
          <FormSubmit type="submit" value="Send invite" />
        </S.StyledDialogFooterWrap>
      </Form>
    </S.StyledDialog>
  );
};

export default InviteDialog;
