import styled from 'styled-components';
import { Props } from './index';

export const StyledImageFrame = styled.div<Props>`
  background-color: ${(props) =>
    props.theme.palette[props.background || 'white']};
  width: 150px;
  height: 150px;
`;
