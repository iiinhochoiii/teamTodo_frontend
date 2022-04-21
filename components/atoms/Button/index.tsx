import React, { HTMLAttributes } from 'react';
import { StyledButton } from './style';
import { useRouter } from 'next/router';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  size?: string;
  background?: string;
  font?: {
    size?: string;
    weight?: string;
    color?: string;
  };
  to?: string;
}

const Button = (props: Props) => {
  const { children, to } = props;
  const router = useRouter();

  const route = () => {
    if (to) {
      router.push(to);
    }
  };

  if (to) {
    return (
      <StyledButton {...props} onClick={route}>
        {children}
      </StyledButton>
    );
  } else {
    return <StyledButton {...props}>{children}</StyledButton>;
  }
};

export default Button;
