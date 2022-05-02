import React, { useState, useEffect } from 'react';
import DashboardSidebar from './sidebar';
import { DashboardHeader } from '@/components/organisms';
import { Box, Flex } from '@/components/atoms';
import { StyledContainer } from './style';
import { useRouter } from 'next/router';

interface Props {
  children?: React.ReactNode;
}

const MiniDrawer = (props: Props) => {
  const { children } = props;
  const [path, setPath] = useState('Home');

  const router = useRouter();

  useEffect(() => {
    const url = router.pathname.replace('/dashboard', '');

    if (url) {
      const text = url.replaceAll('/', '');
      setPath(text[0].toUpperCase() + text.slice(1));
    } else {
      setPath('Home');
    }
  }, [router]);

  return (
    <Flex>
      <DashboardSidebar />
      <StyledContainer>
        <DashboardHeader title={path} />
        <Box width={1 / 2} style={{ margin: '0 auto' }}>
          {children}
        </Box>
      </StyledContainer>
    </Flex>
  );
};

export default MiniDrawer;
