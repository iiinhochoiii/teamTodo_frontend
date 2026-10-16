import React from 'react';
import { Flex, Text } from '@/components/atoms';
import GroupsIcon from '@mui/icons-material/Groups';

const TeamDirectoryHeader = () => {
  return (
    <Flex>
      <GroupsIcon style={{ width: '40px', height: '40px' }} />
      <Text sx={{ margin: '0 0 0 10px' }} font={{ size: 'L', weight: 500 }}>
        Team Directory
      </Text>
    </Flex>
  );
};

export default TeamDirectoryHeader;
