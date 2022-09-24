import styled from 'styled-components';
import { theme } from 'styled-tools';

export const StyledHeader = styled.header`
  display: flex;
  box-shadow: rgb(0 0 0 / 5%) 0px 5px 10px -5px;
  background: ${theme('palette.white')};
  transition: box-shadow 0.3s ease 0s, transform 0.3s ease 0s;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 100;
`;

export const HeaderContent = styled.div`
  width: 1080px;
  margin: 0 auto;
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
`;

export const StyledLogo = styled.a`
  font-family: 'Lilita One', cursive;
  font-size: 32px;
`;

export const HeaderLink = styled.a`
  margin: auto 20px auto 0;
  font-size: 16px;
  font-weight: 500;
`;
