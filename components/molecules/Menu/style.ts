import styled from 'styled-components';
import { palette } from 'styled-tools';

export const StyledMenu = styled.div`
  position: absolute;
  right: 0;
  padding: 10px 0;
  border-radius: 5px;
  width: 200px;
  z-index: 200;
  border: 1px solid ${palette('lightgray')};
  background-color: ${palette('white')};

  & > div {
    width: 190px;
    cursor: pointer;
    padding: 10px 0;
    margin: 0 5px;
    &:hover {
      background-color: ${palette('whitesmoke')};
    }

    & > p {
      margin: 0 15px;
    }
  }
`;
