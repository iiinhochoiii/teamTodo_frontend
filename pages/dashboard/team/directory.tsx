import React from 'react';
import {
  DashboardTemplates,
  TeamDirectoryComponent,
} from '@/components/templates';
import { Flex, Text } from '@/components/atoms';
import GroupsIcon from '@mui/icons-material/Groups';
import AuthHOC from '@/hoc/authHOC';

const TeamDirectory = AuthHOC(() => {
  return (
    <DashboardTemplates
      header={
        <Flex>
          <GroupsIcon style={{ width: '40px', height: '40px' }} />
          <Text sx={{ margin: '0 0 0 10px' }} font={{ size: 'L', weight: 500 }}>
            Team Directory
          </Text>
        </Flex>
      }
    >
      <TeamDirectoryComponent />
    </DashboardTemplates>
  );
});

export default TeamDirectory;
