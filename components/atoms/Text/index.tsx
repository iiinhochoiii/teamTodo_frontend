import React, { InputHTMLAttributes } from 'react';
import { StyledText } from './style';

export interface Props extends InputHTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  font?: {
    size?: string;
    weight?: string | number;
  };
  color?: string;
}

const Text = (props: Props) => {
  const { children } = props;

  return <StyledText {...props}>{children}</StyledText>;
};

export default Text;
