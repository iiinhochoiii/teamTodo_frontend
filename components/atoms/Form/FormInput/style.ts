import styled from 'styled-components';
import { palette, theme } from 'styled-tools';
import { Props } from './index';

export const StyledFormInput = styled.input<Props>`
  outline: none;

  &:read-only {
    background-color: ${palette('lightgray')};
  }
`;

export const StyledLabel = styled.label`
  font-size: ${theme('font.size.S')};
  font-weight: 500;
  display: flex;
  margin: 0 0 10px 0;
`;
