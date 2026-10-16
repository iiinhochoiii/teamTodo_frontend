import React from 'react';
import * as S from './style';
import { Button, Flex } from '@/components/atoms';

const Header = () => {
  return (
    <S.StyledHeader>
      <S.HeaderContent>
        <S.StyledLogo href="/">TeamTodo</S.StyledLogo>

        <Flex>
          <S.HeaderLink href="/auth/signup">Signup</S.HeaderLink>
          <Button
            background="purple"
            color="white"
            size={'L'}
            font={{ size: 'M', weight: '600' }}
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
