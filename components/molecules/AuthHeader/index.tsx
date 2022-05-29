import React from 'react';
import Link from 'next/link';
import * as S from './style';

const AuthHeader = () => {
  return (
    <S.StyledAuthHeader>
      <S.StyledAuthHeaderContent>
        <Link href="/">
          <S.StyledAuthHeaderLink>Team Todo</S.StyledAuthHeaderLink>
        </Link>
      </S.StyledAuthHeaderContent>
    </S.StyledAuthHeader>
  );
};

export default AuthHeader;
