import React, { useEffect, useState } from 'react';
import * as S from './style';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Flex, Text, Box } from '@/components/atoms';
import { useRouter } from 'next/router';
import EditDialog from '@/components/templates/Dashboard/Team/Directory/Dialog/edit';
import { useQuery } from 'react-query';
import { getTeamsByName } from '@/apis/team';
import { EMPTY_TEAM_MASKCOT } from '@/constants/emoji';
import { useUserStore } from '@/stores/useUserStore';
import useTeamMutation from '@/hooks/queries/team/useTeamMutation';

const TeamHeader = () => {
  const router = useRouter();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const { user } = useUserStore();
  const { unSubscribeMutation } = useTeamMutation();

  const { data, refetch } = useQuery('teamDetail', () =>
    getTeamsByName(String(router.query.id))
  );

  useEffect(() => {
    refetch();
  }, [router.query.id]);

  const menu = [
    { id: 1, href: `/dashboard/team/${router.query.id}/home`, name: 'home' },
    {
      id: 2,
      href: `/dashboard/team/${router.query.id}/members`,
      name: 'members',
    },
  ];

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
        <Link href="/dashboard/team/directory">
          <a style={{ fontSize: '14px' }}>{user?.name}’s Workspace</a>
        </Link>
        <ChevronRightIcon />
        <Text font={{ size: 'S', weight: 700 }} width="100%">
          {router.query.id}
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
          {router.query.id}
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
          <Link key={item.id} href={item.href}>
            <a
              style={
                item.href ===
                router.pathname.replace('[id]', String(router.query.id))
                  ? { borderBottom: '2px solid #4848d3' }
                  : undefined
              }
            >
              <span
                style={
                  item.href ===
                  router.pathname.replace('[id]', String(router.query.id))
                    ? { backgroundColor: '#ededff' }
                    : undefined
                }
              >
                {item.name}
              </span>
            </a>
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
