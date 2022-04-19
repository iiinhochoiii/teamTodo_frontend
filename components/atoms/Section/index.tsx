import React, { InputHTMLAttributes } from 'react';
import { StyledSection, StyledContainer } from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Section = (props: Props) => {
  const { children } = props;

  return (
    <StyledSection {...props}>
      <StyledContainer>{children}</StyledContainer>
    </StyledSection>
  );
};

export default Section;
