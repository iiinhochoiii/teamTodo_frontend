import styled from 'styled-components';

interface Props {
  isLogo?: boolean;
}

export const StyledHeader = styled.div`
  display: flex;
`;

export const HeaderContent = styled.div`
  width: 1080px;
  margin: 0 auto;
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

export const HeaderLink = styled.a<Props>`
  font-family: ${(props) => props?.isLogo && `'Lilita One', cursive`};
  font-size: ${(props) => props?.isLogo && '32px'};

  margin: auto 0;
`;
