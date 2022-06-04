import React from 'react';
import * as S from './style';

export interface Props {
  sx?: React.CSSProperties;
  color?: string;
}

const HRBox = (props: Props) => {
  const { sx } = props;
  return <S.StyledHRBox {...props} style={sx}></S.StyledHRBox>;
};

export default HRBox;
