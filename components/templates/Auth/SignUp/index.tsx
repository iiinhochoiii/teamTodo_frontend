import React from 'react';
import {
  StyledSignUpContainer,
  StyledSignUpContent,
  StyledHeaderText,
} from './style';

const SignUpComponent = () => {
  return (
    <StyledSignUpContainer>
      <StyledSignUpContent>
        <StyledHeaderText>회원가입</StyledHeaderText>
      </StyledSignUpContent>
    </StyledSignUpContainer>
  );
};

export default SignUpComponent;
