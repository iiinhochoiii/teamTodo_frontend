import React, { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogProps } from '@mui/material/Dialog';
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
  const contentRef = useRef<HTMLDivElement>(null);

  // 바깥(backdrop) 클릭으로는 닫히지 않도록 하고, 닫기·하단 버튼으로만 닫히게 함 (ESC 는 유지)
  const onClose: DialogProps['onClose'] = (_, reason) => {
    if (reason === 'backdropClick') return;
    setOpen(false);
  };

  // 열림 애니메이션이 끝나면 입력창에 포커스하고 커서를 기존 글 끝으로 이동
  const focusInput = () => {
    const input = contentRef.current?.querySelector<
      HTMLTextAreaElement | HTMLInputElement
    >('textarea, input');
    if (!input) return;

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  };

  return (
    <S.StyledDialog
      onClose={onClose}
      open={open}
      TransitionProps={{ onEntered: focusInput }}
    >
      <S.StyledDialogTitle>
        <Text>{title}</Text>
        <Button
          onClick={() => setOpen(false)}
          background="white"
          font={{ color: 'gray' }}
          size="S"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </Button>
      </S.StyledDialogTitle>
      <S.StyledDialogContent ref={contentRef}>{children}</S.StyledDialogContent>
      {footer}
    </S.StyledDialog>
  );
};

export default Dialogs;
