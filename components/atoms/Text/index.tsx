import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  font?: {
    size?: string;
    weight?: string | number;
  };
  color?: string;
}

const Text = (props: Props) => {
  const { children } = props;

  return <S.StyledText {...props}>{children}</S.StyledText>;
};

export default Text;
