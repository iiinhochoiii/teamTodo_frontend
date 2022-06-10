import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Flex, Button } from '@/components/atoms';
import * as S from './style';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditDialog from './Dialog/edit';

const TeamDirectoryComponent = () => {
  const router = useRouter();
  const [isMenu, setIsMenu] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <S.Container>
      <Box sx={{ margin: '20px 0 0 0' }}>
        <S.Title>{`dlsgh120's WorkSpace`}</S.Title>
        <Text font={{ size: 'M', weight: 300 }}>WorkSpace</Text>
      </Box>
      <S.Content>
        <S.DirectoryItem>
          <S.ItemBadgeWrap>
            <span>😀</span>
          </S.ItemBadgeWrap>
          <S.ItemInfoWrap
            onClick={() => router.push('/dashboard/team/testteam/home')}
          >
            <h4>Test Team</h4>
            <Text font={{ size: 'M', weight: 300 }}>1 member</Text>
            <Flex>
              <Text font={{ size: 'M', weight: 300 }} sx={{ margin: 'auto' }}>
                What does this team do?
              </Text>
              <Button onClick={() => setIsOpenEdit(true)}>
                Add Description
              </Button>
            </Flex>
          </S.ItemInfoWrap>
          <S.ItemAuthWrap>
            <Button sx={{ borderRadius: '10px 0 0 10px' }} disabled>
              Member
            </Button>
            <Button
              sx={{ borderRadius: '0 10px 10px 0', margin: '0 0 0 2px' }}
              onClick={() => setIsMenu(!isMenu)}
            >
              <MoreHorizIcon />
            </Button>
            {isMenu && (
              <S.ItemMenuWrap>
                <Text>Edit team</Text>
                <Text>Delete team</Text>
              </S.ItemMenuWrap>
            )}
          </S.ItemAuthWrap>
        </S.DirectoryItem>
      </S.Content>
      {isOpenEdit && (
        <EditDialog isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />
      )}
    </S.Container>
  );
};

export default TeamDirectoryComponent;
