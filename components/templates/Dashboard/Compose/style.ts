import styled, { css } from 'styled-components';
import { theme, palette } from 'styled-tools';

export const Container = styled.div`
  margin: 30px 0 0 0;
  padding: 0 30px;
  width: 60%;
`;

export const Title = styled.h1`
  ${theme('font.style.subtitle2')}
`;

interface ArticleProps {
  isContent?: boolean;
}

export const Article = styled.div<ArticleProps>`
  display: flex;
  padding: 10px;
  border-radius: 10px;

  ${(props) => {
    if (props.isContent) {
      return css`
        border: 1px solid ${palette('lightgray')};
      `;
    } else {
      return css`
        cursor: pointer;
        &:hover {
          background-color: ${palette('whitesmoke')};
        }
      `;
    }
  }}
`;

export const ArticleIcon = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid ${palette('lightgray')};
  margin: 0 10px 0 0;
`;

export const ArticleContent = styled.div`
  width: 100%;
`;

export const ArticleEditor = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface IconButtonProps {
  disabled?: boolean;
}

export const IconButton = styled.button<IconButtonProps>`
  background: none;
  border: none;

  ${(props) => {
    if (props.disabled) {
      return css`
        & > svg {
          color: ${palette('lightgray')};
        }
      `;
    } else {
      return css`
        cursor: pointer;
        & > svg {
          color: ${palette('gray')};
        }
      `;
    }
  }}
`;
