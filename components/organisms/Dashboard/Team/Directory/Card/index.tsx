import React, { useState } from 'react';
import { Text, Flex, Button, PendingLabel } from '@/components/atoms';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as S from './style';
import { Team } from '@/types/team';
import EditDialog from '@/components/templates/Dashboard/Team/Directory/Dialog/edit';
import { EMPTY_TEAM_MASKCOT } from '@/constants/emoji';
import { useUserStore } from '@/stores/useUserStore';

interface Props {
  team: Team;
  deleteTeam: (id: number) => void;
  isDeleting?: boolean; // DELETE /teams/{id} 요청 중 (목록 재조회까지)
}
const TeamDirectoryCard = (props: Props) => {
  const { team, deleteTeam, isDeleting } = props;
  const { user } = useUserStore();
  const [isMenu, setIsMenu] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <S.Content key={team.id} $isDeleting={isDeleting} aria-busy={!!isDeleting}>
      <S.DirectoryItem>
        <S.ItemBadgeWrap>
          <span>{team?.maskcot || EMPTY_TEAM_MASKCOT}</span>
        </S.ItemBadgeWrap>
        <S.ItemInfoWrap href={`/dashboard/team/${team.name}/home`}>
          <h4>
            {team.name}
            {isDeleting && (
              <S.DeletingText>
                <PendingLabel color="#d72b3f">삭제 중...</PendingLabel>
              </S.DeletingText>
            )}
          </h4>
          <Text font={{ size: 'M', weight: 300 }}>
            {team.members.length} members
          </Text>
          {team.description ? (
            <Text className="team-diriectory-description">
              {team.description}
            </Text>
          ) : team.members.find((m) => m.user_id === user?.id)?.role ===
            'owner' ? (
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
          ) : null}
        </S.ItemInfoWrap>
        <S.ItemAuthWrap>
          <Button sx={{ borderRadius: '10px 0 0 10px' }} disabled>
            {team.members.find((m) => m.user_id === user?.id)?.role}
          </Button>
          <Button
            sx={{ borderRadius: '0 10px 10px 0', margin: '0 0 0 2px' }}
            disabled={
              team.members.find((m) => m.user_id === user?.id)?.role !== 'owner'
            }
            onClick={() => setIsMenu(!isMenu)}
          >
            <MoreHorizIcon />
          </Button>
          {isMenu && (
            <S.ItemMenuWrap>
              <Text
                onClick={() => {
                  setIsOpenEdit(true);
                  setIsMenu(false);
                }}
              >
                Edit team
              </Text>
              <Text
                onClick={() => {
                  if (window.confirm('삭제 하시겠습니까?')) {
                    deleteTeam(team.id);
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
        <EditDialog isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} team={team} />
      )}
    </S.Content>
  );
};

export default TeamDirectoryCard;
