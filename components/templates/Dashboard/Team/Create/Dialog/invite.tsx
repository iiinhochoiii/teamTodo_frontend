import React, { ChangeEvent, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as S from './style';
import { Button, Text } from '@/components/atoms';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteDialog = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const [emails, setEmails] = useState<string[]>(['', '', '']);

  const updateHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setEmails(emails.map((email, i) => (i === index ? e.target.value : email)));
  };

  console.log(emails);

  return (
    <S.StyledDialog onClose={() => setIsOpen(false)} open={isOpen}>
      <S.StyledDialogTitleWrap>
        <S.Title>Invite People</S.Title>
        <Text font={{ size: 'S', weight: '400' }} color="gray">
          팀원을 초대하여, Todo를 공유해보세요.
        </Text>
        <Button
          onClick={() => setIsOpen(false)}
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
      </S.StyledDialogTitleWrap>
      <S.StyledDialogContentWrap>
        <Text sx={{ margin: '0 0 15px 0' }}>Email address</Text>
        <S.StyledContentEmail
          type="text"
          placeholder="Example Name <name@example.com>"
          value={emails[0]}
          onChange={(e) => updateHandler(e, 0)}
        />
        <S.StyledContentEmail
          type="text"
          placeholder="Example Name <name@example.com>"
          value={emails[1]}
          onChange={(e) => updateHandler(e, 1)}
        />
        <S.StyledContentEmail
          type="text"
          placeholder="Example Name <name@example.com>"
          value={emails[2]}
          onChange={(e) => updateHandler(e, 2)}
        />
      </S.StyledDialogContentWrap>
    </S.StyledDialog>
  );
};

export default InviteDialog;
