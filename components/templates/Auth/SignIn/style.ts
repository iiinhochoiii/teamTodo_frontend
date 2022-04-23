import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const StyledSignInContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #f8f8f8;
`;

export const StyledSignInContent = styled.div`
  position: relative;
  margin: auto;
  padding: 25px 15px;
  width: 596px;
  border: 1px solid ${palette('lightgray')};
  background-color: ${palette('white')};

  & > form {
    input[type='text'],
    input[type='password'] {
      margin: 10px 0 0 0;
      padding: 0 10px;
      border: 1px solid ${palette('lightgray')};
      height: 40px;
      width: calc(100% - 20px);
    }

    & > input[type='submit'] {
      margin: 25px 0 0 0;
      width: ${theme('button.size.MAX')};
      height: 40px;
      background-color: ${palette('black')};
      color: ${palette('white')};
      font-size: ${theme('font.size.M')};
      border: none;
    }
  }
`;

export const StyledHeaderText = styled.h2`
  ${theme('font.style.h2')}
  font-weight: 400;
  margin: 0;
`;
