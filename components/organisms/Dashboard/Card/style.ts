import styled, { css } from 'styled-components';
import { palette, theme } from 'styled-tools';

export const StyledCard = styled.article`
  margin: 0 0 30px 0;
  border: 1px solid ${palette('lightgray')};
  border-radius: 10px;
  width: 100%;
`;

export const StyledCardHeader = styled.div`
  display: flex;
  padding: 20px 20px 0 20px;

  svg {
    cursor: pointer;
  }
`;

export const CardBadge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${palette('gray')};
  display: flex;

  & > p {
    margin: 0 auto 0 auto;
    font-size: 28px;
    line-height: 28px;
  }

  & > svg {
    width: 100%;
    height: 100%;
    color: ${palette('lightgray')};
    z-index: 100;
  }
`;

export const CardContent = styled.div`
  padding: 10px;
`;

interface IconProps {
  type?: string;
}

export const CardContentIcon = styled.div<IconProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid ${palette('gray')};
  background-color: ${palette('white')};
  margin: auto 15px 2px 5px;

  ${(props) => {
    if (props.type === 'done') {
      return css`
        display: flex;
        background-color: ${palette('gray')};
        &::before {
          content: '✔';
          font-size: ${theme('font.size.XS')};
          margin: -2px auto 0 auto;
          color: ${palette('white')};
        }
      `;
    }
  }}
`;

export const CardContentItem = styled.div`
  display: flex;
  padding: 15px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${palette('whitesmoke')};
    border-radius: 5px;
  }

  & > svg {
    width: 20px;
    margin: 0 15px 0 3px;
    color: ${palette('purple')};
  }
`;
