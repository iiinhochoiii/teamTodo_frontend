import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { menu } from './menu';
import { Drawer } from './material-style';
import { StyledLogo, StyledIconButton } from './style';
import { Flex } from '@/components/atoms';

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
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default DashboardSidebar;
