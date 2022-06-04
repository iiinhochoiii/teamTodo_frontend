import React from 'react';
import * as S from './style';
import { FormInput, HRBox, Text, Button } from '@/components/atoms';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const TeamCreateComponent = () => {
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
          <FormInput type="text" labelText="Team name" />
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
            <button>
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
        <Button background="purple">Create</Button>
        <Button
          background="white"
          font={{ color: 'purple' }}
          sx={{ margin: '0 0 0 10px', width: 'auto' }}
        >
          Cancel
        </Button>
      </S.ButtonContent>
    </S.Container>
  );
};

export default TeamCreateComponent;
