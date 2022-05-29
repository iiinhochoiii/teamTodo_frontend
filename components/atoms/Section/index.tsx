import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  background?: string;
}

const Section = (props: Props) => {
  const { children } = props;

  return (
    <S.StyledSection {...props}>
      <S.StyledContainer>{children}</S.StyledContainer>
    </S.StyledSection>
  );
};

export default Section;
