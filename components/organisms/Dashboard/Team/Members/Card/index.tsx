import React from 'react';
import * as S from './style';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Text, HRBox, PendingBar } from '@/components/atoms';
import { Members } from '@/types/team';
import dayjs from 'dayjs';
import { useUserStore } from '@/stores/useUserStore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useTeamMutation from '@/queries/team/useTeamMutation';

interface Props {
  member: Members;
  creatorId: number;
}

const TeamMembersCard = (props: Props) => {
  const { member, creatorId } = props;
  const { user } = useUserStore();
  const { distroyMemberMutation } = useTeamMutation();
  // 멤버 목록 재조회까지 pending 유지 → 카드가 목록에서 사라질 때까지 표시
  const isRemoving = distroyMemberMutation.isLoading;

  const onDistroyHandler = () => {
    if (!user || isRemoving) {
      return;
    }

    if (window.confirm('내보내기 하시겠습니까?')) {
      distroyMemberMutation.mutate({
        userId: member.user_id,
        teamId: member.team_id,
      });
    }
  };

  if (!user) {
    return <></>;
  }

  return (
    <S.StyledWrap
      isMe={user.id === member.user_id}
      $isRemoving={isRemoving}
      aria-busy={isRemoving}
    >
      {isRemoving && (
        <PendingBar color="red" style={{ borderRadius: '10px 10px 0 0' }} />
      )}
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
            {member.user.name} {user?.id === member.user_id && '(ME)'}
            {isRemoving && <S.RemovingText>내보내는 중...</S.RemovingText>}
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
