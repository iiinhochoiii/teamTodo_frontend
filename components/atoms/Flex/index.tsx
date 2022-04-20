import React, { InputHTMLAttributes } from 'react';
import { StyledFlex } from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  justify?: string;
}

const Box = (props: Props) => {
  const { children } = props;

  return <StyledFlex {...props}>{children}</StyledFlex>;
};

export default Box;
