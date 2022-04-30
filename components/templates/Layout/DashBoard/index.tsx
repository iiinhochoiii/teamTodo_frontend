import React from 'react';
import DashboardSidebar from './sidebar';
import { Box, Flex } from '@/components/atoms';

interface Props {
  children?: React.ReactNode;
}

const MiniDrawer = (props: Props) => {
  const { children } = props;

  return (
    <Flex>
      <DashboardSidebar />
      <Box width={1 / 2} style={{ margin: '0 auto' }}>
        {children}
      </Box>
    </Flex>
  );
};

export default MiniDrawer;
