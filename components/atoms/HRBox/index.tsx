import React from 'react';
import * as S from './style';

export interface Props {
  style?: React.CSSProperties;
  color?: string;
}

const HRBox = (props: Props) => {
  return <S.StyledHRBox {...props}></S.StyledHRBox>;
};

export default HRBox;
