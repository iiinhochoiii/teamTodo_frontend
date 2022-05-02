import styled from 'styled-components';
import { palette } from 'styled-tools';

export const StyledLogo = styled.a`
  font-size: 32px;
  font-family: 'Lilita One', cursive;
`;

export const StyledSidebar = styled.nav`
  width: 250px;
`;

export const StyledSidearContent = styled.div`
  position: fixed;
  width: 250px;
  height: 100vh;
  border-right: 1px solid ${palette('lightgray')};
  background-color: ${palette('whitesmoke')};
`;

export const StyledContainer = styled.main`
  width: calc(100% - 250px);
`;
