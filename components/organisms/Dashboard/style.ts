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
  background-color: ${palette('black')};
  border-radius: 50%;
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
    background-color: ${palette('lightgray')};
    border-radius: 5px;
  }
`;
