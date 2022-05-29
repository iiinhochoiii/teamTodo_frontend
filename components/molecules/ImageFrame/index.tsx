import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  background?: string;
}

const ImageFrame = (props: Props) => {
  const { children } = props;
  return <S.StyledImageFrame {...props}>{children}</S.StyledImageFrame>;
};

export default ImageFrame;
