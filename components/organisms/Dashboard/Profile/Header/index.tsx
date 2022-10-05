import React from 'react';
import { Flex, Text } from '@/components/atoms';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useUserStore } from '@/stores/useUserStore';

const ProfileHeader = () => {
  const { user } = useUserStore();

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
