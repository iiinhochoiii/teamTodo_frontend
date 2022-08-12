import React, { useState } from 'react';
import * as S from './style';
import {
  Form,
  FormInput,
  FormSubmit,
  HRBox,
  Text,
  Button,
} from '@/components/atoms';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import InviteDialog from './Dialog/invite';
import { useMutation } from 'react-query';
import { checkTeam, createTeam } from '@/apis/team';

interface FormType {
  teamName: string;
}

const TeamCreateComponent = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<FormType>();
  const [isOpen, setIsOpen] = useState(false);
  const [isValidTeamName, setIsValidTeamName] = useState(false);

  const createMutaion = useMutation(
    () => {
      const params = {
        name: watch('teamName'),
      };

      return createTeam(params);
    },
    {
      onSuccess: (data) => {
        const { result, message } = data;

        if (message) {
          alert(message);
        }

        if (result) {
          router.push('/dashboard/team/directory');
        }
      },
      onError: (err) => {
        console.log(err);
        alert('팀 생성중 오류가 발생하였습니다.');
      },
    }
  );
  const checkTeamMutation = useMutation((name: string) => checkTeam(name), {
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

  const checkTeamName = (form: FormType) => {
    const { teamName } = form;
    if (!teamName) {
      alert('팀 명을 입력해주세요');
      return;
    }

    checkTeamMutation.mutate(teamName);
  };

  return (
    <S.Container>
      <S.CreateContent>
        <S.ContentDescription>
          <S.ContentTitle>Basic Infomaiton</S.ContentTitle>
          <S.ContentSubTitle>
            새롭게 생성할 팀이름을 지정하고, 이를 나타내는 이모지를 선택해
            주세요.
          </S.ContentSubTitle>
        </S.ContentDescription>
        <S.ContentItem>
          <Form onSubmit={handleSubmit(checkTeamName)}>
            <FormInput
              type="text"
              {...register('teamName')}
              labelText="Team name"
              placeholder="생성할 팀명을 입력해주세요"
            />
            <FormSubmit type="submit" value="중복 확인" />
          </Form>
        </S.ContentItem>
      </S.CreateContent>
      <HRBox color="gray" sx={{ margin: '40px 0' }} />
      <S.CreateContent>
        <S.ContentDescription>
          <S.ContentTitle>Team Members</S.ContentTitle>
          <S.ContentSubTitle>
            팀에 속한 팀원들은 서로의 Todo를 자동으로 볼 수 있습니다.
          </S.ContentSubTitle>
        </S.ContentDescription>
        <S.ContentItem>
          <Text font={{ size: 'S', weight: 500 }}>Add Team Members</Text>
          <S.TeamMemberWrap>
            <S.TeamMemberAvatar>
              <span>I</span>
            </S.TeamMemberAvatar>
            <Text font={{ size: 'M', weight: 300 }} sx={{ margin: 'auto 0' }}>
              Inho Choi
            </Text>
          </S.TeamMemberWrap>
          <S.InviteMemberItem>
            <button onClick={() => setIsOpen(true)}>
              <PersonAddAltIcon />
              <Text color="purple" sx={{ margin: 'auto 0 auto 10px' }}>
                Invite People
              </Text>
            </button>
          </S.InviteMemberItem>
        </S.ContentItem>
      </S.CreateContent>
      <HRBox color="gray" sx={{ margin: '40px 0' }} />
      <S.ButtonContent>
        <Button
          background="purple"
          onClick={() => {
            if (isValidTeamName) {
              createMutaion.mutate();
            } else {
              alert('팀 이름 중복확인이 되지 않았습니다.');
            }
          }}
        >
          Create
        </Button>
        <Button
          background="white"
          font={{ color: 'purple' }}
          sx={{ margin: '0 0 0 10px', width: 'auto' }}
          onClick={() => {
            router.push('/dashboard/team/directory');
          }}
        >
          Cancel
        </Button>
      </S.ButtonContent>
      {isOpen && <InviteDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </S.Container>
  );
};

export default TeamCreateComponent;
