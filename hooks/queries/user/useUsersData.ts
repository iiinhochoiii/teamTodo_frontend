import { useQuery } from 'react-query';
import { getMy } from '@/apis/user';
import * as queryKeys from '@/constants/queryKeys';

const useUsersData = () => {
  return useQuery(queryKeys.USER_DATA, () => getMy());
};

export default useUsersData;
