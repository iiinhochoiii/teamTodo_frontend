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
      <S.StyledButton {...props} onClick={route}>
        {children}
      </S.StyledButton>
    );
  } else {
    return <S.StyledButton {...props}>{children}</S.StyledButton>;
  }
};

export default Button;
