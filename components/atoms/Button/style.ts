import styled, { css } from 'styled-components';
import { Props } from './index';

const fontStyles = css<Props>`
  ${({ theme, font }) => {
    const selectedFontSize = theme.font.size[font?.size || 'M'];
    const selectedFontWeight =
      theme.font.weight[
        theme.font.weight.findIndex(
          (item: number | string) => item === font?.weight
        )
      ] || 400;

    return css`
      font-size: ${selectedFontSize};
      font-weight: ${selectedFontWeight};
    `;
  }}
`;

const buttonStyles = css<Props>`
  ${fontStyles}
  ${({ theme, color, size }) => {
    const selectedColor = theme.palette[color || 'black'];
    const selectedSize = theme.button.size[size || 'L'];

    return css`
      background-color: ${selectedColor};
      color: ${theme.palette['white']};
      width: ${selectedSize};
    `;
  }}
`;

export const StyledButton = styled.button<Props>`
  ${buttonStyles}

  border: none;
  cursor: pointer;
  border-radius: 5px;
  height: 40px;
`;
