import React, { useState } from 'react';
import { Text, Flex, Button } from '@/components/atoms';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from 'next/link';
import * as S from './style';
import { Team } from '@/interfaces/models/team';
import EditDialog from '@/components/templates/Dashboard/Team/Directory/Dialog/edit';
import { EMPTY_TEAM_MASKCOT } from '@/constants/emoji';

interface Props {
  team: Team;
  deleteTeam: (id: number) => void;
}
const TeamDirectoryCard = (props: Props) => {
  const { team, deleteTeam } = props;
  const [isMenu, setIsMenu] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <S.Content key={team.team.id}>
      <S.DirectoryItem>
        <S.ItemBadgeWrap>
          <span>{team.team?.maskcot || EMPTY_TEAM_MASKCOT}</span>
        </S.ItemBadgeWrap>
        <Link href={`/dashboard/team/${team.team.name}/home`}>
          <S.ItemInfoWrap>
            <h4>{team.team.name}</h4>
            <Text font={{ size: 'M', weight: 300 }}>1 member</Text>
            {team.role === 'owner' && (
              <Flex>
                <Text font={{ size: 'M', weight: 300 }} sx={{ margin: 'auto' }}>
                  What does this team do?
                </Text>
                <Button
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    e.preventDefault();
                    setIsOpenEdit(true);
                  }}
                >
                  Add Description
                </Button>
              </Flex>
            )}
          </S.ItemInfoWrap>
        </Link>
        <S.ItemAuthWrap>
          <Button sx={{ borderRadius: '10px 0 0 10px' }} disabled>
            {team.role}
          </Button>
          <Button
            sx={{ borderRadius: '0 10px 10px 0', margin: '0 0 0 2px' }}
            disabled={team.role !== 'owner'}
            onClick={() => setIsMenu(!isMenu)}
          >
            <MoreHorizIcon />
          </Button>
          {isMenu && (
            <S.ItemMenuWrap>
              <Text>Edit team</Text>
              <Text
                onClick={() => {
                  if (window.confirm('삭제 하시겠습니까?')) {
                    deleteTeam(team.team_id);
                  }
                  setIsMenu(false);
                }}
              >
                Delete team
              </Text>
            </S.ItemMenuWrap>
          )}
        </S.ItemAuthWrap>
      </S.DirectoryItem>
      {isOpenEdit && (
        <EditDialog isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />
      )}
    </S.Content>
  );
};

export default TeamDirectoryCard;
