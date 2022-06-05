import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: number | string;
  sx?: React.CSSProperties;
}

const Box = (props: Props) => {
  const { children, sx } = props;

  return (
    <S.StyledBox {...props} style={sx}>
      {children}
    </S.StyledBox>
  );
};

Box.defaultProps = {
  width: '100%',
};

export default Box;
