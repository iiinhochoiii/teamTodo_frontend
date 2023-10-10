import styled from 'styled-components';
import { theme } from 'styled-tools';

export const Container = styled.div`
  margin: 30px 0 0 0;
  padding: 0 30px;
  width: 60%;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: ${theme('font.size.ML')};
  font-weight: 500;
`;
