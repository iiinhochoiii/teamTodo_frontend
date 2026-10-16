import Link from 'next/link';
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

// next/link 는 DOM 요소가 아니라서 스타일용 prop(font, color)이 <a>로 전달되지 않도록 막음
export const StyledLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => !['font', 'color'].includes(prop),
})<Props>`
  ${fontStyles};
  color: ${(props) => props.theme.palette[props.color || 'black']};
`;
