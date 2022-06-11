import styled from 'styled-components';
import { palette } from 'styled-tools';

export const StyledWrap = styled.article`
  width: 45%;
  border: 1px solid ${palette('lightgray')};
  border-radius: 10px;
`;

export const StyledHeader = styled.header`
  margin: 24px 18px;
  display: flex;
`;

export const HeaderBadge = styled.div`
  border: 2px solid ${palette('gray')};
  border-radius: 5px;
  width: 96px;
  height: 96px;
  margin: 0 24px 0 0;

  & > svg {
    width: 100%;
    height: 100%;
    color: ${palette('lightgray')};
  }
`;

export const HeaderContent = styled.div``;
