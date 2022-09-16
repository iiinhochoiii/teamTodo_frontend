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
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: auto 0;
  cursor: pointer;
  display: flex;
  border: 1px solid ${palette('gray')};
  padding: 2px;

  & > p {
    margin: 0 1px 0 1px;
    font-size: 28px;
    line-height: 28px;
  }

  & > svg {
    width: 100%;
    height: 100%;
    color: ${palette('lightgray')};
    z-index: 100;
  }
`;
