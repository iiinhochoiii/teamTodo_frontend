import React from 'react';
import Link from 'next/link';
import { StyledLink } from './style';

export interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  href?: string;
  as?: string;
  color?: string;
}

const Links = (props: Props) => {
  const { children, href, as, color } = props;
  return (
    <Link href={href || '/'} passHref as={as}>
      <StyledLink color={color}>{children}</StyledLink>
    </Link>
  );
};

export default Links;
