import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const HeaderContainer = styled.header`
  border-bottom: 1px solid ${palette('lightgray')};
  padding: 20px 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
`;

export const HeaderText = styled.h1`
  ${theme('font.style.subtitle1')}
  margin: 0;
`;

export const HeaderBadge = styled.div`
  background-color: ${palette('black')};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 0 0 auto 0;
`;
