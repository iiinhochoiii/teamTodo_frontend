import React from 'react';
import * as S from './style';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Text, HRBox } from '@/components/atoms';
import { Members } from '@/interfaces/models/team';
import dayjs from 'dayjs';
import { useUserStore } from '@/stores/useUserStore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useTeamMutation from '@/hooks/queries/team/useTeamMutation';

interface Props {
  member: Members;
  creatorId: number;
}

const TeamMembersCard = (props: Props) => {
  const { member, creatorId } = props;
  const { user } = useUserStore();
  const { distroyMemberMutation } = useTeamMutation();

  const onDistroyHandler = () => {
    if (!user) {
      return;
    }

    if (window.confirm('내보내기 하시겠습니까?')) {
      distroyMemberMutation.mutate({
        userId: member.user_id,
        teamId: member.team_id,
      });
    }
  };

  return (
    <S.StyledWrap>
      <S.StyledHeader>
        {creatorId === user?.id && user.id !== member.user_id && (
          <button className="distroy_member_button" onClick={onDistroyHandler}>
            <HighlightOffIcon />
          </button>
        )}
        <S.HeaderBadge>
          {member.user.profile ? (
            <p className="member_profile_image">{member.user.profile}</p>
          ) : (
            <AccountBoxIcon />
          )}
        </S.HeaderBadge>
        <S.HeaderContent>
          <S.HeaderContentTitle>
            {member.user.name} {user?.id === member.user_id && '(ME)'}{' '}
            {!member.isActive && '(Invited)'}
          </S.HeaderContentTitle>
          <Text font={{ size: 'S', weight: 400 }} color="gray">
            {member.user?.position}
          </Text>
          <S.HeaderContentGroup>
            <GroupsOutlinedIcon />
            <Text color="gray" sx={{ margin: '0 0 0 10px' }}>
              {member.role}
            </Text>
          </S.HeaderContentGroup>
        </S.HeaderContent>
      </S.StyledHeader>
      <S.ContentSection>
        <HRBox color="lightgray" sx={{ margin: '10px 0' }} />
        <S.SectionItem>
          <S.SectionItemTitle>Last Logined</S.SectionItemTitle>
          <S.SectionItemInfo>
            <CalendarTodayOutlinedIcon />
            <Text>
              {dayjs(member.user.lastLoginedAt).format('YYYY-MM-DD HH:mm:ss') ||
                '-'}
            </Text>
          </S.SectionItemInfo>
        </S.SectionItem>

        <HRBox color="lightgray" sx={{ margin: '10px 0' }} />
        <S.SectionItem>
          <S.SectionItemTitle>Email</S.SectionItemTitle>
          <S.SectionItemInfo>
            <Text>{member.user.email}</Text>
          </S.SectionItemInfo>
        </S.SectionItem>

        <HRBox color="lightgray" sx={{ margin: '10px 0' }} />
        <S.SectionItem>
          <S.SectionItemTitle>Phone</S.SectionItemTitle>
          <S.SectionItemInfo>
            <Text>{member.user.phone || '-'}</Text>
          </S.SectionItemInfo>
        </S.SectionItem>
      </S.ContentSection>
    </S.StyledWrap>
  );
};

export default TeamMembersCard;
