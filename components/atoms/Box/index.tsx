import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: number | string;
  sx?: React.CSSProperties;
}

const Box = ({ width = '100%', ...props }: Props) => {
  const { children, sx } = props;

  return (
    <S.StyledBox {...props} width={width} style={sx}>
      {children}
    </S.StyledBox>
  );
};

export default Box;
