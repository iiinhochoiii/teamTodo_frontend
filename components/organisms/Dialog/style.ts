import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { palette } from 'styled-tools';

export const StyledDialog = styled(Dialog)`
  & > .MuiDialog-container {
    & > .MuiPaper-root {
      width: 700px;
      border-radius: 10px;
    }
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  padding: 0px 24px;
  height: 60px;
  & > p {
    margin: auto 0;
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  margin: 10px 20px;
  padding: 0 10px;
  border: 1px solid ${palette('lightgray')};
  border-radius: 10px;
`;
