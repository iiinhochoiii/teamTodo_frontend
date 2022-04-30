import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { menu } from './menu';
import { StyledLogo } from './style';
import { Flex, Text, Box } from '@/components/atoms';
import { StyledSidebar, StyledSidearContent } from './style';

const DashboardSidebar = () => {
  const router = useRouter();

  return (
    <StyledSidebar>
      <StyledSidearContent>
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
                  px: 2.5,
                  ...(index === 0 && { margin: '0 0 30px 0' }),
                }}
                onClick={() => router.push(item.href)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    margin: '0 20px 0 0',
                  }}
                >
                  <img src={item.svg} style={{ width: '20px' }} />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            );
          })}

          <Box style={{ margin: '30px 0 0 20px' }} width="auto">
            <Text color="gray" font={{ size: 'M', weight: 300 }}>
              My teams
            </Text>
          </Box>
        </List>
      </StyledSidearContent>
    </StyledSidebar>
  );
};

export default DashboardSidebar;
