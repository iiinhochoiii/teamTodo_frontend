import React, { useState } from 'react';
import * as S from './style';
import GroupsIcon from '@mui/icons-material/Groups';
import { Text, Button } from '@/components/atoms';
import TeamInviteDialog from '@/components/templates/Dashboard/Team/Create/Dialog/invite';
import { Team } from '@/interfaces/models/team';

interface Props {
  team?: Team;
}

const TeamMembersInviteItem = (props: Props) => {
  const { team } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.Container>
      <S.ContentIcon>
        <GroupsIcon />
      </S.ContentIcon>
      <Text
        font={{ size: 'M', weight: 700 }}
        color="gray"
        sx={{ margin: '20px 0' }}
      >
        Todo를 공유할 멤버를 초대해주세요.
      </Text>
      <Button
        background="purple"
        sx={{ width: 'auto', padding: '10px 16px' }}
        onClick={() => setIsOpen(true)}
      >
        Invite your team
      </Button>
      {isOpen && (
        <TeamInviteDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          type="invite"
          team={team}
        />
      )}
    </S.Container>
  );
};

export default TeamMembersInviteItem;
