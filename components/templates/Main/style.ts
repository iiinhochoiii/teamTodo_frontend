import styled from 'styled-components';

interface titleProps {
  color?: string;
}

export const StyledTitle = styled.h1<titleProps>`
  font-size: 34px;
  color: ${(props) => props.theme.palette[props.color || 'black']};
  margin: 30px 0;
  font-weight: 500;
`;

export const StyledContent = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 700px;
`;

export const MainBanner = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
`;

export const MainBannerContentWrap = styled.div`
  padding-right: 30px;
`;

export const MainBannerImageWrap = styled.div`
  min-width: 800px;
  width: 45vw;
  position: relative;

  & > span {
    position: absolute;
    border-radius: 10px;
  }
`;
