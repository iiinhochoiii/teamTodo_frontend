import React from 'react';
import { StyledHRBox } from './style';

export interface Props {
  style?: React.CSSProperties;
  color?: string;
}

const HRBox = (props: Props) => {
  return <StyledHRBox {...props}></StyledHRBox>;
};

export default HRBox;
