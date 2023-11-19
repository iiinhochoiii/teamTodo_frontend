import React, { useState, useEffect } from 'react';
import DashboardSidebar from './sidebar';
import { DashboardHeader } from '@/components/organisms';
import { Flex } from '@/components/atoms';
import * as S from './style';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Props {
  children?: React.ReactNode;
  title?: string;
  header?: React.ReactNode;
}

const MiniDrawer = (props: Props) => {
  const { children, title, header } = props;
  const [path, setPath] = useState(title || 'Home');

  const [isOpenSide, setIsOpenSide] = useState(true);

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
      <Head>
        <title>{path ? `${path} | TeamTodo` : 'Team Todo'}</title>
      </Head>
      <DashboardSidebar isOpenSide={isOpenSide} setIsOpenSide={setIsOpenSide} />
      <S.StyledContainer isOpenMenu={isOpenSide}>
        <DashboardHeader title={path} header={header} />
        <Flex width={1 / 2}>{children}</Flex>
      </S.StyledContainer>
    </Flex>
  );
};

export default MiniDrawer;
