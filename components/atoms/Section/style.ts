import styled from 'styled-components';
import { Props } from './index';

export const StyledSection = styled.section<Props>`
  display: flex;
  background: ${(props) => props.theme.palette[props.background || 'white']};
`;

export const StyledContainer = styled.div`
  max-width: 1080px;
  width: calc(100% - 40px);
  margin: 0 auto;
`;
