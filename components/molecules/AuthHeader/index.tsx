import React from 'react';
import * as S from './style';

const AuthHeader = () => {
  return (
    <S.StyledAuthHeader>
      <S.StyledAuthHeaderContent>
        <S.StyledAuthHeaderLink href="/">Team Todo</S.StyledAuthHeaderLink>
      </S.StyledAuthHeaderContent>
    </S.StyledAuthHeader>
  );
};

export default AuthHeader;
