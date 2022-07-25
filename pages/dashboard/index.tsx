import React, { useContext, useEffect } from 'react';
import { DashboardTemplates, DashboardComponent } from '@/components/templates';
import { useQuery, QueryClient, dehydrate } from 'react-query';
import { getMy } from '@/apis/user';
import { User } from '@/interfaces/models/user';
import { AppContext } from '@/contexts';

const DashboardPage = () => {
  const { setUserInfo } = useContext(AppContext);
  const { data } = useQuery('users', getMy);

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data]);
  return (
    <DashboardTemplates>
      <DashboardComponent />
    </DashboardTemplates>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<User>(['users'], getMy);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default DashboardPage;
