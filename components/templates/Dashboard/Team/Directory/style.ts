import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const Container = styled.div`
  margin: 30px 0 0 0;
  padding: 0 30px;
  width: 60%;
`;

export const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: ${theme('font.size.ML')};
  font-weight: 500;
`;

export const Content = styled.div`
  margin: 50px 0 0 0;
`;

export const DirectoryItem = styled.div`
  display: flex;
  margin: 0 0 0 40px;
`;

export const ItemBadgeWrap = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${palette('white')};
  border-radius: 6px;
  box-shadow: -1px 1px 3px rgb(0 0 0 / 20%);
  display: flex;

  & > span {
    margin: auto;
  }
`;

export const ItemInfoWrap = styled.a`
  cursor: pointer;
  margin: 0 0 0 30px;
  & > h4 {
    margin: 0;
    font-size: ${theme('font.size.ML')};
  }

  & > div {
    & > button {
      z-index: 100;
      background: none;
      color: ${palette('purple')};
      width: auto;
      height: auto;
      margin: 3px 0 0 10px;
    }
  }
`;

export const ItemAuthWrap = styled.div`
  display: flex;
  margin: 0 0 0 auto;
  position: relative;

  & > button {
    background-color: ${palette('lightgreen')};
    color: ${palette('green')};
    width: auto;
    padding: 0 15px;
    & > svg {
      margin: auto;
    }
  }
`;

export const ItemMenuWrap = styled.div`
  position: absolute;
  right: 0;
  top: 45px;
  z-index: 100;
  background-color: ${palette('white')};
  box-shadow: 0 2px 2px rgb(0 0 0 / 5%), 0 4px 16px rgb(0 0 0 / 10%);
  border-radius: 5px;
  width: 160px;

  & > p {
    font-size: ${theme('font.size.S')};
    margin: 5px;
    padding: 15px 5px;
    cursor: pointer;
    &:hover {
      border-radius: 5px;
      background-color: ${palette('whitesmoke')};
    }
  }
`;
