import React, { useState } from 'react';
import * as S from './style';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Flex, Text, Box } from '@/components/atoms';
import { useRouter } from 'next/router';
import EditDialog from '@/components/templates/Dashboard/Team/Directory/Dialog/edit';

const TeamHeader = () => {
  const router = useRouter();
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const menu = [
    { id: 1, href: `/dashboard/team/${router.query.id}/home`, name: 'home' },
    {
      id: 2,
      href: `/dashboard/team/${router.query.id}/members`,
      name: 'members',
    },
  ];

  return (
    <React.Fragment>
      <Flex>
        <Link href="/dashboard/team/directory">
          <a style={{ fontSize: '14px' }}>dlsgh120’s Workspace</a>
        </Link>
        <ChevronRightIcon />
        <Text font={{ size: 'S', weight: 700 }}>{router.query.id}</Text>
      </Flex>
      <Flex sx={{ margin: '15px 0' }}>
        <Box sx={{ fontSize: '32px' }}>🔴</Box>
        <Text
          sx={{ margin: 'auto 0 auto 10px' }}
          font={{ size: 'L', weight: 500 }}
        >
          {router.query.id}
        </Text>
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
      </Flex>
      <S.LinkWrap>
        {menu.map((item) => (
          <Link key={item.id} href={item.href}>
            <a
              style={
                item.href === router.asPath
                  ? { backgroundColor: '#ededff' }
                  : undefined
              }
            >
              {item.name}
            </a>
          </Link>
        ))}
      </S.LinkWrap>
      {isOpenEdit && (
        <EditDialog isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />
      )}
    </React.Fragment>
  );
};

export default TeamHeader;
