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
export const StyledFormTextArea = styled.textarea`
  ${fontStyles};
  width: calc(100% - 10px);
  min-height: 80px;
  border: none;
  resize: none;
  outline: none;
`;
