import styled from 'styled-components';
import { palette } from 'styled-tools';
import LinearProgress from '@mui/material/LinearProgress';

export const StyledPendingBar = styled(LinearProgress)<{
  $color: 'purple' | 'red';
}>`
  &.MuiLinearProgress-root {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    z-index: 1;
    background-color: ${(props) =>
      props.$color === 'red'
        ? 'rgba(215, 43, 63, 0.15)'
        : palette('lightpurple')(props)};
  }

  & .MuiLinearProgress-bar {
    background-color: ${(props) => palette(props.$color)(props)};
  }
`;
