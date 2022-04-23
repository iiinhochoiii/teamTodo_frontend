import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardSidebar from './sidebar';
import { AppBar } from './material-style';
import { StyledToolbar, StyledIconButton } from './style';
import { Box, Flex, Text } from '@/components/atoms';

interface Props {
  children?: React.ReactNode;
}

const MiniDrawer = (props: Props) => {
  const { children } = props;
  const [open, setOpen] = useState(true);

  return (
    <Flex>
      <AppBar open={open}>
        <StyledToolbar>
          <StyledIconButton
            onClick={() => setOpen(true)}
            disabled={open}
            style={{ margin: '0 15px 0 0' }}
          >
            <MenuIcon />
          </StyledIconButton>
          <Box>
            <Text font={{ size: 'L', weight: 500 }}>good</Text>
          </Box>
        </StyledToolbar>
      </AppBar>
      <DashboardSidebar open={open} handleDrawerClose={() => setOpen(false)} />
      <Box style={{ padding: '85px 30px 30px 30px' }}>{children}</Box>
    </Flex>
  );
};

export default MiniDrawer;
