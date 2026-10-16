import React from 'react';
import * as S from './style';

export interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  href?: string;
  color?: string;
  font?: {
    size?: string;
    weight?: string | number;
  };
}

const Links = (props: Props) => {
  const { children, href, color, font, style } = props;
  return (
    <S.StyledLink href={href || '/'} color={color} font={font} style={style}>
      {children}
    </S.StyledLink>
  );
};

export default Links;
