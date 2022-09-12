import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 50px 0;
`;

export const HeaderText = styled.h3`
  ${theme('font.style.subtitle1')}
  font-weight: 400;
  margin: 0 0 20px 0;
`;

export const Content = styled.div`
  width: 80%;
  margin: 0 auto;

  & > form {
    padding: 0 20px 30px 20px;
    width: 60%;
    border: 1px solid ${palette('gray')};
    border-radius: 10px;

    & > input[type='password'],
    input[type='text'] {
      margin: 30px 0 0 0;
      padding: 0 10px;
      border: 1px solid ${palette('lightgray')};
      border-radius: 10px;
      height: 40px;
      width: calc(100% - 20px);
    }

    & > input[type='submit'] {
      margin: 20px 0 0 0;
      width: ${theme('button.size.L')};
      height: 40px;
      background-color: ${palette('purple')};
      border-radius: 5px;
      color: ${palette('white')};
      font-size: ${theme('font.size.S')};
      border: none;
      cursor: pointer;
    }
  }
`;
