import React, { HTMLAttributes } from 'react';
import { StyledButton } from './style';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = (props: Props) => {
  const { children } = props;

  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
