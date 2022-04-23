import styled, { css } from 'styled-components';

interface titleProps {
  color?: string;
  type?: string;
}

const typeStyles = css<titleProps>`
  ${({ theme, type }) => {
    const selectedFont = theme.font.style[type || 'h4'];

    return css`
      ${selectedFont};
    `;
  }}
`;

export const StyledTitle = styled.h1<titleProps>`
  ${typeStyles};
  color: ${(props) => props.theme.palette[props.color || 'black']};
  margin: 30px 0;
`;

export const StyledContent = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 700px;
`;

export const StyledFunctionContainer = styled.div``;
