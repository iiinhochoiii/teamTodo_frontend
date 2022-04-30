import styled from 'styled-components';
import { palette } from 'styled-tools';
import Toolbar from '@mui/material/Toolbar';

export const StyledToolbar = styled(Toolbar)`
  background-color: ${palette('white')};
  margin: auto 0;
`;

export const StyledLogo = styled.a`
  font-size: 32px;
  font-family: 'Lilita One', cursive;
`;

export const StyledSidebar = styled.div`
  width: 250px;
  border-right: 1px solid ${palette('lightgray')};
  background-color: ${palette('whitesmoke')};
`;
