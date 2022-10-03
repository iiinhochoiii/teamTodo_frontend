import { useQuery } from 'react-query';
import { getMy } from '@/apis/user';

const useUsersData = () => {
  return useQuery('users', () => getMy());
};

export default useUsersData;
