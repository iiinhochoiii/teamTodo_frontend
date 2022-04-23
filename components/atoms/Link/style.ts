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

export const StyledLink = styled.a<Props>`
  ${fontStyles};
  color: ${(props) => props.theme.palette[props.color || 'black']};
`;
