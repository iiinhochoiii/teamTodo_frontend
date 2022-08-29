import React, { useContext } from 'react';
import { DashboardTemplates } from '@/components/templates';
import AuthHOC from '@/hoc/authHOC';
import { Flex, Text } from '@/components/atoms';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { AppContext } from '@/contexts';

const Profile = AuthHOC(() => {
  const { user } = useContext(AppContext);
  return (
    <DashboardTemplates
      header={
        <Flex>
          <PersonOutlineIcon style={{ width: '40px', height: '40px' }} />
          <Text sx={{ margin: '0 0 0 10px' }} font={{ size: 'L', weight: 500 }}>
            {user?.name}
          </Text>
        </Flex>
      }
    >
      test
    </DashboardTemplates>
  );
});

export default Profile;
