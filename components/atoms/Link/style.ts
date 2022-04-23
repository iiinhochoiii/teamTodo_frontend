import styled from 'styled-components';
import { Props } from './index';

export const StyledLink = styled.a<Props>`
  color: ${(props) => props.theme.palette[props.color || 'black']};
`;
