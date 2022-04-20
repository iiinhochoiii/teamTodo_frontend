import styled from 'styled-components';
import { Props } from './index';

export const StyledSection = styled.section<Props>`
  display: flex;
  background: ${(props) => props.theme.palette[props.background || 'white']};
`;

export const StyledContainer = styled.div`
  width: 1080px;
  margin: 0 auto;
`;
