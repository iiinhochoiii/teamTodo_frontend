import React from 'react';
import Link from 'next/link';
import * as S from './style';

export interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  href?: string;
  as?: string;
  color?: string;
  font?: {
    size?: string;
    weight?: string | number;
  };
}

const Links = (props: Props) => {
  const { children, href, as, color, font, style } = props;
  return (
    <Link href={href || '/'} passHref as={as}>
      <S.StyledLink color={color} font={font} style={style}>
        {children}
      </S.StyledLink>
    </Link>
  );
};

export default Links;
