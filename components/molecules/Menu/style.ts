import styled from 'styled-components';
import { palette } from 'styled-tools';

export const StyledMenu = styled.div`
  position: absolute;
  right: 370px;
  padding: 10px 0;
  border-radius: 5px;
  width: 200px;
  z-index: 200;
  box-shadow: 0 2px 2px rgb(0 0 0 / 5%), 0 4px 16px rgb(0 0 0 / 10%);
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
