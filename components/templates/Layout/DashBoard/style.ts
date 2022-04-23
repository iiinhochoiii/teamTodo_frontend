import styled, { css } from 'styled-components';
import { palette, ifProp } from 'styled-tools';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

export const StyledToolbar = styled(Toolbar)`
  background-color: ${palette('white')};
  margin: auto 0;
`;

interface ButtonProps {
  disabled?: boolean;
  border?: string;
}

const colorStyles = css<ButtonProps>`
  ${({ theme, border }) => {
    const selectedColor = theme.palette[border || 'white'];

    return css`
      border: 1px solid ${selectedColor};
    `;
  }}
`;

export const StyledIconButton = styled(IconButton)<ButtonProps>`
  ${colorStyles};
  color: ${palette('black')};
  display: ${ifProp('disabled', 'none')};
`;

export const StyledLogo = styled.a`
  font-size: 32px;
  font-family: 'Lilita One', cursive;
`;
