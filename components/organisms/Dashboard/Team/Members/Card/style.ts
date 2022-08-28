import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const StyledWrap = styled.article`
  width: 48.5%;
  border: 1px solid ${palette('lightgray')};
  border-radius: 10px;
  margin: 0 0 24px 0;
`;

export const StyledHeader = styled.header`
  margin: 24px 18px;
  display: flex;
`;

export const HeaderBadge = styled.div`
  border: 2px solid ${palette('gray')};
  border-radius: 5px;
  width: 76px;
  height: 76px;
  margin: 0 24px 0 0;

  & > svg {
    width: 100%;
    height: 100%;
    color: ${palette('lightgray')};
  }
`;

export const HeaderContent = styled.div``;

export const HeaderContentTitle = styled.h3`
  margin: 0;
  font-size: ${theme('font.size.ML')};
  font-weight: bold;
`;

export const HeaderContentGroup = styled.div`
  display: flex;
  margin: 5px 0;
  & > svg {
    color: ${palette('gray')};
  }
`;

export const ContentSection = styled.section`
  padding: 0 12px 10px;
`;

export const SectionItem = styled.div`
  display: flex;
`;

export const SectionItemTitle = styled.p`
  margin: 0;
  font-size: ${theme('font.size.S')};
  font-weight: 600;
  width: 107px;
`;

export const SectionItemInfo = styled.div`
  display: flex;

  & > svg {
    margin: auto 10px auto 0;
    color: ${palette('gray')};
    width: 18px;
    height: 18px;
  }

  & > p {
    font-size: ${theme('font.size.S')};
    font-weight: 300;
    color: ${palette('gray')};
  }
`;
