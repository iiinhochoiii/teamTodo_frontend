import React from 'react';
import Link from 'next/link';
import * as S from './style';
import { Button, Flex } from '@/components/atoms';

const Header = () => {
  return (
    <S.StyledHeader>
      <S.HeaderContent>
        <Link href="/">
          <S.StyledLogo>TeamTodo</S.StyledLogo>
        </Link>

        <Flex>
          <Link href="/auth/signup">
            <S.HeaderLink>Signup</S.HeaderLink>
          </Link>
          <Button
            color={'black'}
            size={'L'}
            font={{ size: 'M', weight: 'bold' }}
            to={'/auth/signin'}
          >
            Signin
          </Button>
        </Flex>
      </S.HeaderContent>
    </S.StyledHeader>
  );
};

export default Header;
