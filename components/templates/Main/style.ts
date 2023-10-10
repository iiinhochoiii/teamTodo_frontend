import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

interface titleProps {
  color?: string;
}

export const StyledTitle = styled.h1<titleProps>`
  font-size: 34px;
  color: ${(props) => props.theme.palette[props.color || 'black']};
  margin: 30px 0;
  font-weight: 500;

  @media screen and (max-width: 900px) {
    font-size: 22px;
  }
`;

export const StyledContent = styled.div`
  margin: 0 auto;
  text-align: center;

  & > p {
    font-size: 24px;
    color: ${palette('black')};
    font-weight: 400;
    margin: 0;
  }

  @media screen and (max-width: 900px) {
    & > p {
      font-size: 18px;
    }
  }
`;

export const StyledTopBannerSection = styled.section`
  background-image: url('./images/top-banner.png');
  background-size: cover;
  height: 500px;
  padding-top: 80px;
  display: flex;
`;

export const StyledTopBannerContentWrap = styled.div`
  max-width: 1080px;
  width: calc(100% - 40px);
  margin: 0 auto;

  & > h1 {
    margin-top: 100px;
    font-size: ${theme('font.size.XL')};
    color: ${palette('black')};
  }

  & > p {
    margin-top: 50px;
    font-size: ${theme('font.size.M')};
    color: ${palette('black')};
  }
`;

export const InfoContainer = styled.div`
  padding-top: 80px;
`;

export const SelectionWrap = styled.section<{
  background?: string;
}>`
  background-color: ${(props) =>
    props.background ? palette(props.background) : palette('white')};
  display: flex;

  & > div {
    max-width: 1080px;
    width: calc(100% - 40px);
  }

  @media screen and (max-width: 900px) {
    & > div {
      flex-wrap: wrap;

      & > div:first-of-type {
        width: 100%;
      }
      & > div:last-of-type {
        width: 100%;
      }
    }

    &:nth-child(3) {
      & > div {
        flex-direction: column-reverse;
      }
    }
  }
`;
