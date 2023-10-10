import styled from 'styled-components';
import { palette } from 'styled-tools';

export const Container = styled.article`
  width: 48.5%;
  border: 1px dashed ${palette('lightgray')};
  border-radius: 10px;
  min-height: 256px;
  background-color: ${palette('whitesmoke')};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const ContentIcon = styled.div`
  & > svg {
    width: 48px;
    height: 48px;
    color: ${palette('gray')};
  }
`;
