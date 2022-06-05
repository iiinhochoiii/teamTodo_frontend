import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  justify?: string;
  sx?: React.CSSProperties;
}

const Box = (props: Props) => {
  const { children, sx } = props;

  return (
    <S.StyledFlex {...props} style={props.style || sx}>
      {children}
    </S.StyledFlex>
  );
};

export default Box;
