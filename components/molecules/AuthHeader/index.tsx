import React from 'react';
import Link from 'next/link';
import {
  StyledAuthHeader,
  StyledAuthHeaderContent,
  StyledAuthHeaderLink,
} from './style';

const AuthHeader = () => {
  return (
    <StyledAuthHeader>
      <StyledAuthHeaderContent>
        <Link href="/">
          <StyledAuthHeaderLink>Team Todo</StyledAuthHeaderLink>
        </Link>
      </StyledAuthHeaderContent>
    </StyledAuthHeader>
  );
};

export default AuthHeader;
