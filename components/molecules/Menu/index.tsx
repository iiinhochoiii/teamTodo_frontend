import React, { HTMLAttributes } from 'react';
import * as S from './style';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Menu = (props: Props) => {
  const { children } = props;

  return <S.StyledMenu {...props}>{children}</S.StyledMenu>;
};

export default Menu;
