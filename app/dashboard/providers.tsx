'use client';

import React, { useEffect } from 'react';
import { DehydratedState, Hydrate } from 'react-query';
import useUsersData from '@/queries/user/useUsersData';
import { useUserStore } from '@/stores/useUserStore';

const UserInitializer = () => {
  const { data } = useUsersData();
  const { setUserInfo } = useUserStore();

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data, setUserInfo]);

  return null;
};

interface Props {
  children: React.ReactNode;
  dehydratedState: DehydratedState;
}

const DashboardProviders = ({ children, dehydratedState }: Props) => {
  return (
    <Hydrate state={dehydratedState}>
      <UserInitializer />
      {children}
    </Hydrate>
  );
};

export default DashboardProviders;
