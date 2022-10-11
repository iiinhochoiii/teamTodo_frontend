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
import dynamic from 'next/dynamic';
import { IEmojiData } from 'emoji-picker-react';
import { EMPTY_TEAM_MASKCOT } from '@/constants/emoji';
import useTeamMutation from '@/hooks/queries/team/useTeamMutation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserStore } from '@/stores/useUserStore';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface FormType {
  teamName: string;
}

const TeamCreateComponent = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<FormType>();
  const [isOpen, setIsOpen] = useState(false);
  const [isEmoji, setIsEmoji] = useState(false);
  const [emojiData, setEmojiData] = useState<IEmojiData>();
  const { isValid, checkTeamMutation, createMutaion } = useTeamMutation();
  const [emails, setEmails] = useState<string[]>([]);

  const { user } = useUserStore();

  const create = () => {
    if (isValid) {
      const params = {
        name: watch('teamName'),
        maskcot: emojiData?.emoji || EMPTY_TEAM_MASKCOT,
        ...(emails.length > 0 && { emails }),
      };
      createMutaion.mutate(params);
    } else {
      alert('팀 이름 중복확인이 되지 않았습니다.');
    }
  };

  const checkTeamName = (form: FormType) => {
    const { teamName } = form;
    if (!teamName) {
      alert('팀 명을 입력해주세요');
      return;
    }

    checkTeamMutation.mutate(teamName);
  };

  const onEmojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    data: IEmojiData
  ) => {
    setEmojiData(data);
    setIsEmoji(false);
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
          <S.EmojiWrap>
            <Text font={{ size: 'S', weight: 400 }}>Team mascot</Text>
            <div className="emoji-content">
              <div>{emojiData?.emoji || EMPTY_TEAM_MASKCOT}</div>
              <button onClick={() => setIsEmoji(!isEmoji)}>edit</button>
            </div>

            {isEmoji && <Picker onEmojiClick={onEmojiClick} />}
          </S.EmojiWrap>
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
              {user?.profile ? <p>{user?.profile}</p> : <AccountCircleIcon />}
            </S.TeamMemberAvatar>
            <Text font={{ size: 'M', weight: 300 }} sx={{ margin: 'auto 0' }}>
              {user?.name}
            </Text>
          </S.TeamMemberWrap>
          {emails.length > 0 &&
            emails.map((email, index) => (
              <S.TeamMemberWrap key={index}>
                <S.TeamMemberAvatar>
                  <AccountCircleIcon />
                </S.TeamMemberAvatar>
                <Text
                  font={{ size: 'M', weight: 300 }}
                  sx={{ margin: 'auto 0' }}
                >
                  {email}
                </Text>
              </S.TeamMemberWrap>
            ))}
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
            create();
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
      {isOpen && (
        <InviteDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          type="create"
          callbackFn={(email: string[]) => {
            if (emails.filter((item) => email.includes(item)).length > 0) {
              alert('이미 추가된 이메일이 존재합니다.');
              return;
            }
            setEmails([...emails, ...email]);
            setIsOpen(false);
          }}
        />
      )}
    </S.Container>
  );
};

export default TeamCreateComponent;
