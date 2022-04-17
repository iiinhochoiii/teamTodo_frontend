import React from 'react';
import Link from 'next/link';
import { StyledHeader, HeaderContent, HeaderLink } from './style';

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContent>
        <Link href="/">
          <HeaderLink isLogo={true}>TeamTodo</HeaderLink>
        </Link>

        <Link href="/login">
          <HeaderLink>로그인</HeaderLink>
        </Link>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
