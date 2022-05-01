import React from 'react';
import DashboardSidebar from './sidebar';
import { DashboardHeader } from '@/components/organisms';
import { Box, Flex } from '@/components/atoms';
import { StyledContainer } from './style';

interface Props {
  children?: React.ReactNode;
}

const MiniDrawer = (props: Props) => {
  const { children } = props;

  return (
    <Flex>
      <DashboardSidebar />
      <StyledContainer>
        <DashboardHeader />
        <Box width={1 / 2} style={{ margin: '0 auto' }}>
          {children}
        </Box>
      </StyledContainer>
    </Flex>
  );
};

export default MiniDrawer;
