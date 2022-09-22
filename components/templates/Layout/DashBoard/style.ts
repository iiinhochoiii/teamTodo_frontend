import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

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

export const StyledTeamListWrap = styled.div`
  margin: 30px 20px;
`;

interface TeamCardProps {
  isRoute?: boolean;
}

export const StyledTeamCard = styled.div<TeamCardProps>`
  padding: 10px 0;
  border-radius: 10px;
  background-color: ${(props) => props.isRoute && palette('lightpurple')};
  display: flex;

  & > a {
    margin: 0 10px;
    width: 100%;
    font-size: ${theme('font.size.S')};
    color: ${(props) => props.isRoute && palette('purple')};
    display: flex;

    .team-emoji {
      margin-right: 10px;
      font-size: ${theme('font.size.ML')};
    }

    .team-name {
      margin-top: 4px;
    }
  }
`;

export const TeamDirectoryWrap = styled.div`
  display: flex;
  margin: 30px 20px 0 20px;

  & > a {
    color: ${palette('gray')};
    display: flex;
    font-size: ${theme('font.size.M')};

    & > svg {
      margin: 6px 0 auto 10px;
      width: 15px;
      height: 15px;
    }
  }
`;

export const SidebarFooterWrap = styled.div`
  position: absolute;
  border-top: 1px solid ${palette('lightgray')};
  width: calc(100% - 40px);
  bottom: 100px;
  padding: 20px 20px 0 20px;

  & > button {
    width: 100%;
    background: none;
    color: ${palette('gray')};
    border: 1px solid ${palette('gray')};

    &:hover {
      color: ${palette('white')};
      border: 1px solid ${palette('purple')};
      background-color: ${palette('purple')};
    }
  }
`;
