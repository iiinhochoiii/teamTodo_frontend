import React, { InputHTMLAttributes } from 'react';
import { StyledBox } from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: number | string;
}

const Box = (props: Props) => {
  const { children } = props;

  return <StyledBox {...props}>{children}</StyledBox>;
};

Box.defaultProps = {
  width: '100%',
};

export default Box;
