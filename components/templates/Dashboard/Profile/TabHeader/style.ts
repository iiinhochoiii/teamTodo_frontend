import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const Container = styled.div`
  border-bottom: 1px solid ${palette('lightgray')};
  width: 100%;
  background-color: ${palette('whitesmoke')};
`;

export const Content = styled.div`
  width: 80%;
  grid-column-gap: 30px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0 auto;
  padding: 40px 0;
`;

export const AvatarWrap = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  border: 2px solid ${palette('gray')};
  border-radius: 10px;
  display: flex;

  & > svg {
    width: 100%;
    height: 100%;
    color: ${palette('lightgray')};
  }

  .avatar-emoji {
    margin: auto;
    font-size: 150px;
  }

  .emoji-upload {
    display: none;
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(30, 31, 33, 0.75);
    width: 40%;
    border-radius: 5px;
    height: 30px;
    border: none;
    color: ${palette('white')};
    font-weight: bold;
    cursor: pointer;
  }

  .emoji-picker-react {
    position: absolute;
    top: 50px;
    left: 100px;
  }

  .emoji-save-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  &:hover {
    .emoji-upload {
      display: block;
    }
  }
`;

export const InfoWrap = styled.div`
  width: 260px;
  height: 260px;
  border: 1px solid ${palette('lightgray')};
  border-radius: 10px;
  padding: 10px;
`;

export const InfoHeader = styled.div`
  & > a {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    &:hover {
      & > div > p,
      svg {
        color: ${palette('purple')};
      }
    }

    & > div {
      & > p {
        margin: 0;
        font-size: ${theme('font.size.S')};
        font-weight: 400;
      }
    }

    & > svg {
      width: 15px;
      height: 15px;
      margin: auto 0;
    }
  }
`;

interface InfoContentProps {
  isNotBorder?: boolean;
}

export const InfoContent = styled.div<InfoContentProps>`
  display: flex;
  height: 40px;
  margin: 0 -10px;
  border-top: ${(props) =>
    props.isNotBorder
      ? 'none'
      : `1px solid ${props.theme.palette['lightgray']}`};

  .row-label,
  .row-content,
  .row-empty {
    margin: auto 0;
    font-size: ${theme('font.size.XS')};
  }

  .row-label {
    width: 80px;
    margin-left: 10px;
    color: ${palette('gray')};
    font-weight: bold;
  }

  .row-content {
    margin-right: 10px;
    width: calc(100% - 80px);
  }

  .row-empty {
    margin: 0 10px;
  }
`;

export const TabWrap = styled.ul`
  display: flex;
  width: 80%;
  margin: 0 auto;
  list-style: none;

  & > li {
    background-color: ${palette('lightgray')};
    border-radius: 8px 8px 0 0;
    min-width: 120px;
    height: 40px;
    margin-right: 20px;
    display: flex;

    & > a {
      margin: auto;
      font-size: ${theme('font.size.S')};
      font-weight: 400;
    }
  }
`;
