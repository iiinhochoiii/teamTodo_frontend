import React, { InputHTMLAttributes } from 'react';
import { StyledBox } from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Box = (props: Props) => {
  const { children } = props;

  return <StyledBox {...props}>{children}</StyledBox>;
};

export default Box;
