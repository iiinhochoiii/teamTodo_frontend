import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  font?: {
    size?: string;
    weight?: string | number;
  };
  color?: string;
  sx?: React.CSSProperties;
}

const Text = (props: Props) => {
  const { children, sx } = props;

  return (
    <S.StyledText {...props} style={sx}>
      {children}
    </S.StyledText>
  );
};

export default Text;
