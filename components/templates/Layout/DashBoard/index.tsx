import React, { useState, useEffect } from 'react';
import DashboardSidebar from './sidebar';
import { DashboardHeader } from '@/components/organisms';
import { Flex } from '@/components/atoms';
import * as S from './style';
import { usePathname } from 'next/navigation';

interface Props {
  children?: React.ReactNode;
  title?: string;
  header?: React.ReactNode;
}

// <title> 은 각 app/dashboard/**/page.tsx 의 metadata 에서 지정
const MiniDrawer = (props: Props) => {
  const { children, title, header } = props;
  const [path, setPath] = useState(title || 'Home');

  const [isOpenSide, setIsOpenSide] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    if (!title) {
      const url = pathname.replace('/dashboard', '');

      if (url) {
        const text = url.replaceAll('/', '');
        setPath(text[0].toUpperCase() + text.slice(1));
      } else {
        setPath('Home');
      }
    }
  }, [pathname, title]);

  return (
    <Flex>
      <DashboardSidebar isOpenSide={isOpenSide} setIsOpenSide={setIsOpenSide} />
      <S.StyledContainer isOpenMenu={isOpenSide}>
        <DashboardHeader title={path} header={header} />
        <Flex width={1 / 2}>{children}</Flex>
      </S.StyledContainer>
    </Flex>
  );
};

export default MiniDrawer;
