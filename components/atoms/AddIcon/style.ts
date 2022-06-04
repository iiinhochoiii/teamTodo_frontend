import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const AddItemIcon = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid ${palette('purple')};
  border-radius: 50%;
  display: flex;
  margin: 0 10px 0 0;
  cursor: pointer;

  &::before {
    content: '+';
    font-size: ${theme('font.size.L')};
    font-weight: 400;
    color: ${palette('purple')};
    margin: -11px auto 0 auto;
  }
`;
