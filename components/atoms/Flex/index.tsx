import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  justify?: string;
}

const Box = (props: Props) => {
  const { children } = props;

  return <S.StyledFlex {...props}>{children}</S.StyledFlex>;
};

export default Box;
