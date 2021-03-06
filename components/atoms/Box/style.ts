import styled, { css } from 'styled-components';
import { Props } from './index';

const widthStyles = css<Props>`
  ${(props) => {
    let selectedWidth;

    if (typeof props.width === 'number') {
      if (props.width < 1) {
        selectedWidth = `${props.width * 100}%`;
      } else {
        selectedWidth = `${props.width}%`;
      }
    } else {
      if (props.width?.includes('px')) {
        selectedWidth = `${props.width?.replaceAll('px', '')}px`;
      } else if (props.width?.includes('%')) {
        selectedWidth = `${props.width?.replaceAll('%', '')}%`;
      } else {
        selectedWidth = 'auto';
      }
    }

    return css`
      width: ${selectedWidth};
    `;
  }}
`;

export const StyledBox = styled.div<Props>`
  ${widthStyles};
`;
