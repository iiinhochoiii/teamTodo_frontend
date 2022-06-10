import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as S from './style';
import { Button, Text, Form, FormSubmit, Flex, Box } from '@/components/atoms';
import { useForm } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormType {
  teamName: string;
  description?: string;
}

const EditDialog = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const { register, handleSubmit, reset, watch } = useForm<FormType>({
    defaultValues: {
      teamName: 'Inho choi',
      description: '',
    },
  });

  const submitHandler = (form: FormType) => {
    console.log(form);
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
            <Button
              sx={{ margin: '0 0 0 15px', height: '45px' }}
              background="purple"
            >
              중복확인
            </Button>
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
              🔴
            </Box>
            <Button type="button" onClick={() => console.log('emoji 띄우기')}>
              Edit
            </Button>
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
          <Button>Delete team</Button>
        </S.StyledDialogFooterWrap>
      </Form>
    </S.StyledDialog>
  );
};

export default EditDialog;
