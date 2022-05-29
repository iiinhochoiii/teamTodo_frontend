import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

const Form = (props: Props) => {
  const { children } = props;
  return <S.StyledForm {...props}>{children}</S.StyledForm>;
};

export default Form;
