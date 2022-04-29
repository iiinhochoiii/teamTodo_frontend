import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { StyledDialog, StyledDialogTitle, StyledDialogContent } from './style';
import { Text, Button } from '@/components/atoms';

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  footer?: React.ReactNode;
}

const Dialogs = (props: Props) => {
  const { children, open, setOpen, title, footer } = props;

  return (
    <StyledDialog onClose={() => setOpen(false)} open={open}>
      <StyledDialogTitle onClick={() => setOpen(false)}>
        <Text>{title}</Text>
        <Button
          onClick={() => setOpen(false)}
          background="white"
          font={{ color: 'gray' }}
          size="S"
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </Button>
      </StyledDialogTitle>
      <StyledDialogContent>{children}</StyledDialogContent>
      {footer}
    </StyledDialog>
  );
};

export default Dialogs;
