import styled from 'styled-components';
import { palette } from 'styled-tools';

export const StyledCard = styled.article`
  margin: 0 0 30px 0;
  border: 1px solid ${palette('lightgray')};
  padding: 20px;
  width: 100%;
`;

export const StyledCardHeader = styled.div`
  display: flex;
`;

export const CardBadge = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${palette('black')};
  border-radius: 50%;
`;
