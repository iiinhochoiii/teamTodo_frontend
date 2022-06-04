import React, { useState, useEffect } from 'react';
import DashboardSidebar from './sidebar';
import { DashboardHeader } from '@/components/organisms';
import { Flex } from '@/components/atoms';
import * as S from './style';
import { useRouter } from 'next/router';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const MiniDrawer = (props: Props) => {
  const { children, title } = props;
  const [path, setPath] = useState(title || 'Home');

  const router = useRouter();

  useEffect(() => {
    if (!title) {
      const url = router.pathname.replace('/dashboard', '');

      if (url) {
        const text = url.replaceAll('/', '');
        setPath(text[0].toUpperCase() + text.slice(1));
      } else {
        setPath('Home');
      }
    }
  }, [router]);

  return (
    <Flex>
      <DashboardSidebar />
      <S.StyledContainer>
        <DashboardHeader title={path} />
        <Flex width={1 / 2}>{children}</Flex>
      </S.StyledContainer>
    </Flex>
  );
};

export default MiniDrawer;
