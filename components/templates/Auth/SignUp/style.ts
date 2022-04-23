import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const StyledSignUpContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #f8f8f8;
`;

export const StyledSignUpContent = styled.div`
  position: relative;
  margin: auto;
  padding: 25px 15px;
  width: 596px;
  border: 1px solid ${palette('lightgray')};
  background-color: ${palette('white')};
`;

export const StyledHeaderText = styled.h2`
  ${theme('font.style.h2')}
  font-weight: 400;
  margin: 0;
`;
