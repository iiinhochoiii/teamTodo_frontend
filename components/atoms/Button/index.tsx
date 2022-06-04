import React, { HTMLAttributes } from 'react';
import * as S from './style';
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
  sx?: React.CSSProperties;
}

const Button = (props: Props) => {
  const { children, to, sx } = props;
  const router = useRouter();

  const route = () => {
    if (to) {
      router.push(to);
    }
  };

  if (to) {
    return (
      <S.StyledButton {...props} onClick={route} style={sx}>
        {children}
      </S.StyledButton>
    );
  } else {
    return (
      <S.StyledButton {...props} style={sx}>
        {children}
      </S.StyledButton>
    );
  }
};

export default Button;
