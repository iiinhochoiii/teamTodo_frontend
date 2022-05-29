import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: number | string;
}

const Box = (props: Props) => {
  const { children } = props;

  return <S.StyledBox {...props}>{children}</S.StyledBox>;
};

Box.defaultProps = {
  width: '100%',
};

export default Box;
