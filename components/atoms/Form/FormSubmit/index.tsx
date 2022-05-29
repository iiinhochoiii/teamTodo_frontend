import React, { HTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends HTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  type?: string;
  value?: string;
}

const FormSubmit = (props: Props) => {
  return <S.StyledFormSubmit {...props} />;
};

export default FormSubmit;
