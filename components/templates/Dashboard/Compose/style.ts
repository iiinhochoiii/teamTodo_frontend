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
  position: relative;
`;

export const ArticleContainer = styled.div<ArticleProps>`
  display: flex;
  padding: 10px;
  border-radius: 10px;
  position: relative;

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

interface ArticleIconProps {
  isDone?: boolean;
}

export const ArticleIcon = styled.div<ArticleIconProps>`
  ${(props) => {
    if (props.isDone) {
      return css`
        background-color: ${palette('green')};
        border: 2px solid ${palette('green')};
        &::before {
          content: '✔';
          font-size: ${theme('font.size.XS')};
          margin: -2px auto 0 auto;
          color: ${palette('white')};
        }
      `;
    } else {
      return css`
        border: 2px solid ${palette('lightgray')};

        &:hover {
          border: 2px solid ${palette('green')};
        }
      `;
    }
  }};
  display: flex;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  z-index: 10;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
`;

export const ArticleContent = styled.div`
  width: 100%;
  margin: 0 0 0 30px;
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

export const AddItems = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${palette('whitesmoke')};
    border-radius: 10px;
  }
`;

export const AddItemIcon = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid ${palette('purple')};
  border-radius: 50%;
  display: flex;
  margin: 0 10px 0 0;

  &::before {
    content: '+';
    font-size: ${theme('font.size.L')};
    font-weight: 400;
    color: ${palette('purple')};
    margin: -11px auto 0 auto;
  }
`;
