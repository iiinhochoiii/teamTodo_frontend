import React, { HTMLAttributes } from 'react';
import { StyledMenu } from './style';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Menu = (props: Props) => {
  const { children } = props;

  return <StyledMenu {...props}>{children}</StyledMenu>;
};

export default Menu;
