import styled from 'styled-components';
import { theme, palette } from 'styled-tools';
import Dialog from '@mui/material/Dialog';

export const StyledDialog = styled(Dialog)`
  & > .MuiDialog-container {
    & > .MuiPaper-root {
      min-height: 500px;
      max-height: 800px;
      width: 700px;
      border-radius: 5px;
      padding: 20px;
    }
  }
`;

export const StyledDialogTitleWrap = styled.div`
  border-bottom: 1px solid ${palette('lightgray')};
  padding: 0 0 24px 0;
`;

export const Title = styled.h3`
  margin: 0 0 5px 0;
  font-size: ${theme('font.size.XL')};
  font-weight: 700;
`;

export const StyledDialogContentWrap = styled.div`
  margin: 20px 0 0 0;
  border-bottom: 1px solid ${palette('lightgray')};
  padding: 0 0 24px 0;

  & > button {
    background: none;
    color: ${palette('purple')};
    width: auto;
    height: auto;
  }
`;

export const StyledContentTeamName = styled.input`
  width: calc(70% - 32px);
  padding: 13px 16px;
  border: 1px solid ${palette('gray')};
  border-radius: 10px;
  font-size: ${theme('font.size.M')};
  margin: 0 0 15px 0;

  &::placeholder {
    color: ${palette('lightgray')};
    font-weight: 300;
  }
`;

export const StyledContentMascot = styled.div`
  display: flex;
  position: relative;

  & > button {
    margin: 15px 0 auto 10px;
    background: none;
    color: ${palette('purple')};
    width: auto;
    height: auto;
  }

  .emoji-picker-react {
    position: absolute;
    z-index: 100;
    top: 50px;
    left: 50px;
  }
`;

export const StyledContentTextarea = styled.textarea`
  width: calc(100% - 30px);
  padding: 15px;
  border-radius: 10px;
  min-height: 70px;
  outline: none;
  resize: none;
`;

export const StyledDialogFooterWrap = styled.div`
  margin: 20px 0 0 0;

  & > input[type='submit'] {
    padding: 13px 25px;
    background-color: ${palette('purple')};
    color: ${palette('white')};
    font-size: ${theme('font.size.M')};
    cursor: pointer;
    border: 1px solid ${palette('purple')};
    border-radius: 10px;
  }

  & > button {
    margin: 0 0 0 10px;
    background: none;
    color: ${palette('red')};
    width: auto;
    height: auto;
  }
`;
