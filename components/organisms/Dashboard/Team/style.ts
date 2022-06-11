import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const LinkWrap = styled.div`
  margin: 0 0 -20px 0;
  display: flex;
  & > a {
    & > span {
      padding: 6px 12px;
      color: ${palette('purple')};
      font-size: ${theme('font.size.S')};
      font-weight: 400;
      border-radius: 10px;
      margin: 10px 0;
      display: flex;
      align-items: center;
      align-self: center;
    }
  }
`;
