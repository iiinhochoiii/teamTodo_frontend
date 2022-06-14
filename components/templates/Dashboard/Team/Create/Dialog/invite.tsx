import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as S from './style';
import { Button, Text, Form, FormSubmit } from '@/components/atoms';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useForm, Controller } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormType {
  emails: string[];
  message?: string;
  teams: string;
}

const InviteDialog = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const { register, handleSubmit, reset, watch, control } = useForm<FormType>({
    defaultValues: {
      emails: ['', '', ''],
      message: '',
      teams: 'undefined',
    },
  });

  const mockTeams = [
    { id: 1, name: 'Test Team' },
    { id: 2, name: 'Choi Team' },
  ];

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
          {watch('emails')?.map((email, index) => (
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
                name="teams"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select displayEmpty onChange={onChange} value={value}>
                    <MenuItem value={'undefined'}>
                      <em>No team selected</em>
                    </MenuItem>
                    {mockTeams.map((team) => (
                      <MenuItem key={team.id} value={team.name || ''}>
                        {team.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </S.StyledFormControl>
            <Button
              type="button"
              onClick={() =>
                reset({
                  ...watch(),
                  teams: 'undefined',
                })
              }
            >
              Clear team
            </Button>
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
