import React from 'react';
import * as S from './style';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Text, HRBox } from '@/components/atoms';
import { Members } from '@/interfaces/models/team';
import dayjs from 'dayjs';

interface Props {
  member: Members;
}

const TeamMembersCard = (props: Props) => {
  const { member } = props;

  return (
    <S.StyledWrap>
      <S.StyledHeader>
        <S.HeaderBadge>
          <AccountBoxIcon />
        </S.HeaderBadge>
        <S.HeaderContent>
          <S.HeaderContentTitle>{member.user.name}</S.HeaderContentTitle>
          <Text font={{ size: 'S', weight: 400 }} color="gray">
            Frontend Developer
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
          <S.SectionItemTitle>Status</S.SectionItemTitle>
          <S.SectionItemInfo>
            <CalendarTodayOutlinedIcon />
            <Text>
              {dayjs(member.user.lastLoginedAt).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </S.SectionItemInfo>
        </S.SectionItem>

        <HRBox color="lightgray" sx={{ margin: '10px 0' }} />
        <S.SectionItem>
          <S.SectionItemTitle>Plan</S.SectionItemTitle>
          <S.SectionItemInfo isItem={false}>
            <S.SectionItemIcon />
            <Text>plan</Text>
          </S.SectionItemInfo>
        </S.SectionItem>

        <HRBox color="lightgray" sx={{ margin: '10px 0' }} />
        <S.SectionItem>
          <S.SectionItemTitle>Happened</S.SectionItemTitle>
          <S.SectionItemInfo isItem={false}>
            <S.SectionItemIcon isDone />
            <Text>No items in todo</Text>
          </S.SectionItemInfo>
        </S.SectionItem>
      </S.ContentSection>
    </S.StyledWrap>
  );
};

export default TeamMembersCard;
