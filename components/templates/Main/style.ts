import styled from 'styled-components';

interface titleProps {
  color?: string;
}

export const StyledTitle = styled.h1<titleProps>`
  font-size: 22px;
  color: ${(props) => props.theme.palette[props.color || 'black']};
  margin: 30px 0;
  font-weight: 400;
`;

export const StyledContent = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 700px;
`;
