import React, { InputHTMLAttributes } from 'react';
import { StyledForm } from './style';

export interface Props extends InputHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

const Form = (props: Props) => {
  const { children } = props;
  return <StyledForm {...props}>{children}</StyledForm>;
};

export default Form;
