import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { menu } from './menu';
import { Drawer } from './material-style';
import { StyledLogo, StyledIconButton } from './style';
import { Flex, Text, Box } from '@/components/atoms';

interface Props {
  open: boolean;
  handleDrawerClose: () => void;
}
const DashboardSidebar = (props: Props) => {
  const { open, handleDrawerClose } = props;
  const router = useRouter();

  return (
    <Drawer variant="permanent" open={open}>
      <Flex
        justify="space-between"
        style={{ margin: '20px 0', padding: '0 20px' }}
      >
        <Link href="/dashboard">
          <StyledLogo>Team Todo</StyledLogo>
        </Link>
        <StyledIconButton onClick={handleDrawerClose} border={'gray'}>
          <ChevronLeftIcon />
        </StyledIconButton>
      </Flex>
      <List>
        {menu.map((item, index) => {
          return (
            <ListItemButton
              key={index}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                ...(index === 0 && { margin: '0 0 30px 0' }),
              }}
              onClick={() => router.push(item.href)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <img src={item.svg} style={{ width: '20px' }} />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          );
        })}

        <Box style={{ margin: '30px 0 0 20px' }}>
          <Text
            color="gray"
            font={{ size: 'M', weight: 300 }}
            style={{ ...(!open && { display: 'none' }) }}
          >
            My teams
          </Text>
        </Box>
      </List>
    </Drawer>
  );
};

export default DashboardSidebar;
