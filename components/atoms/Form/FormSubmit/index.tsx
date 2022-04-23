import React, { HTMLAttributes } from 'react';
import { StyledFormSubmit } from './style';

export interface Props extends HTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  type?: string;
  value?: string;
}

const FormSubmit = (props: Props) => {
  return <StyledFormSubmit {...props} />;
};

export default FormSubmit;
