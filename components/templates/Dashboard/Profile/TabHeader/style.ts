import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const Container = styled.div`
  min-height: 400px;
  border-bottom: 1px solid ${palette('lightgray')};
  width: 100%;
  display: flex;
  background-color: ${palette('whitesmoke')};
`;

export const Content = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  margin: auto;
`;

export const AvatarWrap = styled.div`
  width: 280px;
  height: 280px;
  border: 2px solid ${palette('gray')};
  border-radius: 10px;

  & > svg {
    width: 100%;
    height: 100%;
    color: ${palette('lightgray')};
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
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  & > div {
    & > p {
      margin: 0;
    }
  }

  & > svg {
    width: 15px;
    height: 15px;
    margin: auto 0;
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
