import styled from 'styled-components';
import { Props } from './index';

export const StyledFlex = styled.div<Props>`
  display: flex;
  justify-content: ${(props) => props.justify};
`;
