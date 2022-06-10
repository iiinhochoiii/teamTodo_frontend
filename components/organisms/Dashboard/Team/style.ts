import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const LinkWrap = styled.div`
  & > a {
    padding: 5px 15px;
    font-size: ${theme('font.size.S')};
    font-weight: 400;
    color: ${palette('purple')};
    border-radius: 10px;
  }
`;
