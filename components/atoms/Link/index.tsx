import React from 'react';
import Link, { LinkProps } from 'next/link';
import { StyledLink } from './style';

export interface Props extends LinkProps {
  children?: React.ReactNode;
}

const Links = (props: Props) => {
  const { children } = props;
  return (
    <Link href={props.href} passHref as={props.as}>
      <StyledLink>{children}</StyledLink>
    </Link>
  );
};

export default Links;
