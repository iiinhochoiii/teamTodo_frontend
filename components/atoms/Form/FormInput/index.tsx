import React, { HTMLAttributes, forwardRef } from 'react';
import * as S from './style';

export interface Props extends HTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  enabled?: boolean; // enterkey에 대한 활성화
  type?: string;
  labelText?: string;
}

// eslint-disable-next-line react/display-name
const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <>
      {props.labelText && <S.StyledLabel>{props.labelText}</S.StyledLabel>}
      <S.StyledFormInput
        {...props}
        ref={ref}
        readOnly={!!props.readonly}
        onKeyDown={(e) => {
          if (!props.enabled && e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      />
    </>
  );
});

export default FormInput;
