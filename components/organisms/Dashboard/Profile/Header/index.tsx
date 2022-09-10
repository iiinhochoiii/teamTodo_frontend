import React, { useContext } from 'react';
import { AppContext } from '@/contexts';
import { Flex, Text } from '@/components/atoms';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const ProfileHeader = () => {
  const { user } = useContext(AppContext);

  return (
    <Flex>
      <PersonOutlineIcon style={{ width: '40px', height: '40px' }} />
      <Text sx={{ margin: '0 0 0 10px' }} font={{ size: 'L', weight: 500 }}>
        {user?.name}
      </Text>
    </Flex>
  );
};

export default ProfileHeader;
