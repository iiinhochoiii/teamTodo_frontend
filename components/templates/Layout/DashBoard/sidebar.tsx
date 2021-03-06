import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { menu } from './menu';
import { StyledLogo } from './style';
import { Flex, Text, AddIcon } from '@/components/atoms';
import * as S from './style';

const DashboardSidebar = () => {
  const router = useRouter();

  return (
    <S.StyledSidebar>
      <S.StyledSidearContent>
        <Flex
          justify="space-between"
          style={{ margin: '20px 0', padding: '0 20px' }}
        >
          <Link href="/dashboard">
            <StyledLogo>Team Todo</StyledLogo>
          </Link>
        </Flex>
        <List>
          {menu.map((item, index) => {
            return (
              <ListItemButton
                key={index}
                sx={{
                  minHeight: 48,
                  ...(index === 0 && { margin: '0 0 30px 0' }),
                }}
                onClick={() => router.push(item.href)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    margin: '0 20px 0 0',
                  }}
                >
                  <img src={item.svg} style={{ width: '20px' }} />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            );
          })}

          <Flex
            justify="space-between"
            style={{ margin: '30px 20px 0 20px' }}
            width="auto"
          >
            <Text color="gray" font={{ size: 'M', weight: 300 }}>
              My teams
            </Text>
            <AddIcon
              sx={{ margin: 'auto 0' }}
              onClick={() => router.push('/dashboard/team/create')}
            />
          </Flex>
          <S.TeamDirectoryWrap>
            <Link href="/dashboard/team/directory">
              <a>
                Team Directory
                <ArrowForwardIosIcon />
              </a>
            </Link>
          </S.TeamDirectoryWrap>
        </List>
      </S.StyledSidearContent>
    </S.StyledSidebar>
  );
};

export default DashboardSidebar;
