import styled from 'styled-components';
import { Props } from './index';

export const StyledImageFrame = styled.div<Props>`
  background-color: ${(props) =>
    props.theme.palette[props.background || 'white']};
  width: 100%;
  height: 400px;
  border-radius: 20px;
  position: relative;

  & > span {
    top: 10px !important;
    bottom: 10px !important;
    left: 10px !important;
    right: 10px !important;
    border-radius: 10px;
  }
`;
