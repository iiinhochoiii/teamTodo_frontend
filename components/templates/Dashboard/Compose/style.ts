import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const Container = styled.div`
  margin: 30px 0 0 0;
  padding: 0 30px;
  width: 60%;
`;

export const Title = styled.h1`
  ${theme('font.style.subtitle2')}
`;

export const Article = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${palette('whitesmoke')};
    border-radius: 10px;
  }
`;

export const ArticleIcon = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid ${palette('lightgray')};
  margin: auto 10px auto 0;
`;

export const ArticleContent = styled.div`
  margin: -4px 0 0 0;
`;
