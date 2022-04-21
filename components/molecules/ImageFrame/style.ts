import styled from 'styled-components';
import { Props } from './index';

export const StyledImageFrame = styled.div<Props>`
  background-color: ${(props) =>
    props.theme.palette[props.background || 'white']};
  width: 100%;
  height: 250px;
  border-radius: 20px;
`;
