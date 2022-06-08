import React, { ChangeEvent, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as S from './style';
import { Button, Text } from '@/components/atoms';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteDialog = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const [emails, setEmails] = useState<string[]>(['', '', '']);
  const [selectTeam, setSelectTeam] = useState(0 || '');
  const [teams] = useState([
    { id: 1, name: 'Test Team' },
    { id: 2, name: 'Choi Team' },
  ]);

  const [message, setMessage] = useState('');

  const updateHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setEmails(emails.map((email, i) => (i === index ? e.target.value : email)));
  };

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
        {emails.map((email, index) => (
          <S.StyledContentEmail
            key={index}
            type="text"
            placeholder="Example Name <name@example.com>"
            value={emails[index]}
            onChange={(e) => updateHandler(e, index)}
          />
        ))}
        <Button onClick={() => setEmails([...emails, ''])}>
          Add another email
        </Button>

        <Text sx={{ margin: '30px 0 15px 0' }}>Select team</Text>
        <S.StyledContentTeam>
          <S.StyledFormControl focused={false}>
            <Select
              sx={{ outline: 'none' }}
              value={selectTeam}
              onChange={(e: SelectChangeEvent<string>) =>
                setSelectTeam(e.target.value)
              }
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>No team selected</em>
              </MenuItem>
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </S.StyledFormControl>
          <Button onClick={() => setSelectTeam('')}>Clear team</Button>
        </S.StyledContentTeam>
        <Text sx={{ margin: '30px 0 15px 0' }}>Message</Text>

        <S.StyledContentTextarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </S.StyledDialogContentWrap>
      <S.StyledDialogFooterWrap>
        <Button background={'purple'}>Send invite</Button>
      </S.StyledDialogFooterWrap>
    </S.StyledDialog>
  );
};

export default InviteDialog;
