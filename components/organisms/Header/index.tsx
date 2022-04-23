import React from 'react';
import Link from 'next/link';
import { StyledHeader, HeaderContent, HeaderLink, StyledLogo } from './style';
import { Button, Flex } from '@/components/atoms';

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContent>
        <Link href="/">
          <StyledLogo>TeamTodo</StyledLogo>
        </Link>

        <Flex>
          <Link href="/auth/signup">
            <HeaderLink>Signup</HeaderLink>
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
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
