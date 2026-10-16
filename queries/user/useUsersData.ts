import { useQuery } from 'react-query';
import { userService } from '@/apis/services';
import * as queryKeys from '@/constants/queryKeys';

const useUsersData = () => {
  return useQuery(queryKeys.USER_DATA, () => userService.getMy());
};

export default useUsersData;
