import styled, { css } from 'styled-components';
import { Props } from './index';

const colorStyles = css<Props>`
  ${({ theme, color }) => {
    const selectedColor = theme.palette[color || 'black'];

    return css`
      border-bottom: 1px solid ${selectedColor};
    `;
  }}
`;

export const StyledHRBox = styled.div<Props>`
  ${colorStyles};
`;
