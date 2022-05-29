import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as S from './style';
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
    <S.StyledDialog onClose={() => setOpen(false)} open={open}>
      <S.StyledDialogTitle onClick={() => setOpen(false)}>
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
      </S.StyledDialogTitle>
      <S.StyledDialogContent>{children}</S.StyledDialogContent>
      {footer}
    </S.StyledDialog>
  );
};

export default Dialogs;
