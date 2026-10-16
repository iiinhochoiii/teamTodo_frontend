import React, { useState } from 'react';
import * as S from './style';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Flex, Text, Box } from '@/components/atoms';
import { TeamHeaderSkeleton } from '@/components/molecules';
import { usePathname } from 'next/navigation';
import useTeamName from '@/hooks/useTeamName';
import EditDialog from '@/components/templates/Dashboard/Team/Directory/Dialog/edit';
import useTeamDetailData from '@/queries/team/useTeamDetailData';
import { EMPTY_TEAM_MASKCOT } from '@/constants/emoji';
import { useUserStore } from '@/stores/useUserStore';
import useTeamMutation from '@/queries/team/useTeamMutation';
import { safeDecodeURIComponent } from '@/utils/url';

const TeamHeader = () => {
  const pathname = usePathname();
  const teamName = useTeamName();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const { user } = useUserStore();
  const { unSubscribeMutation } = useTeamMutation();

  const { data, isLoading } = useTeamDetailData(teamName);

  const menu = [
    { id: 1, href: `/dashboard/team/${teamName}/home`, name: 'home' },
    {
      id: 2,
      href: `/dashboard/team/${teamName}/members`,
      name: 'members',
    },
  ];
  // usePathname 은 인코딩된 경로를 반환하므로 디코딩 후 비교
  const currentPath = safeDecodeURIComponent(pathname);

  if (isLoading) {
    return <TeamHeaderSkeleton />;
  }

  if (!data) {
    return <></>;
  }

  const onUnSubscribeHandler = () => {
    if (!user) {
      return;
    }

    if (data?.creatorUserId === user.id) {
      alert('팀 생성자는 팀 나가기를 할 수 없습니다.');
      return;
    }

    if (window.confirm('팀에서 나가시겠습니까?')) {
      unSubscribeMutation.mutate(data.id);
    }
  };

  return (
    <React.Fragment>
      <Flex>
        <Link href="/dashboard/team/directory" style={{ fontSize: '14px' }}>
          {user?.name}’s Workspace
        </Link>
        <ChevronRightIcon />
        <Text font={{ size: 'S', weight: 700 }} width="100%">
          {teamName}
        </Text>
      </Flex>
      <Flex sx={{ margin: '15px 0' }}>
        <Box width="auto" sx={{ fontSize: '32px' }}>
          {data.maskcot || EMPTY_TEAM_MASKCOT}
        </Box>
        <Text
          sx={{ margin: 'auto 0 auto 10px' }}
          font={{ size: 'L', weight: 500 }}
        >
          {teamName}
        </Text>
        {user?.id === data.creatorUserId && (
          <Flex sx={{ margin: '17px 0 auto 15px', cursor: 'pointer' }}>
            <EditOutlinedIcon sx={{ color: '#4848d3' }} />
            <Text
              sx={{ margin: '0 0 0 5px' }}
              font={{ size: 'S', weight: 500 }}
              color="purple"
              onClick={() => setIsOpenEdit(true)}
            >
              Edit
            </Text>
          </Flex>
        )}
        {data.creatorUserId !== user?.id && (
          <S.UnSubscribeButton onClick={onUnSubscribeHandler}>
            팀 나가기
          </S.UnSubscribeButton>
        )}
      </Flex>
      <S.LinkWrap>
        {menu.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            style={
              item.href === currentPath
                ? { borderBottom: '2px solid #4848d3' }
                : undefined
            }
          >
            <span
              style={
                item.href === currentPath
                  ? { backgroundColor: '#ededff' }
                  : undefined
              }
            >
              {item.name}
            </span>
          </Link>
        ))}
      </S.LinkWrap>
      {isOpenEdit && (
        <EditDialog
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          team={data}
          isRefresh={true}
        />
      )}
    </React.Fragment>
  );
};

export default TeamHeader;
