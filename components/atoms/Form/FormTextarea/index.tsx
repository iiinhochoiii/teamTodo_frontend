import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import * as S from './style';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly?: boolean;
  font?: {
    size?: string;
    weight?: string | number;
  };
  value?: string;
}

// eslint-disable-next-line react/display-name
const FormTextArea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  return (
    <S.StyledFormTextArea {...props} ref={ref} readOnly={!!props.readonly} />
  );
});

export default FormTextArea;
