import styled from 'styled-components';
import { theme } from 'styled-tools';

export const StyledAuthHeader = styled.header`
  display: flex;
  width: 100%;
  background-color: ${theme('palette.black')};
  position: fixed;
  z-index: 100;
`;

export const StyledAuthHeaderContent = styled.div`
  width: 1080px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
`;

export const StyledAuthHeaderLink = styled.a`
  color: ${theme('palette.white')};
  font-size: 32px;
  font-family: 'Lilita One', cursive;
  margin: auto;
`;
