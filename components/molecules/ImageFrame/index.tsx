import React, { InputHTMLAttributes } from 'react';
import { StyledImageFrame } from './style';

export interface Props extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  background?: string;
}

const ImageFrame = (props: Props) => {
  const { children } = props;
  return <StyledImageFrame {...props}>{children}</StyledImageFrame>;
};

export default ImageFrame;
