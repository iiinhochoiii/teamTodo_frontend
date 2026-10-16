import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { QueryClient, dehydrate } from 'react-query/core';
import { User } from '@/types/user';
import { userService } from '@/apis/services';
import * as queryKeys from '@/constants/queryKeys';
import DashboardProviders from './providers';

// 기존 authHOC 의 getInitialProps(유저 정보 prefetch) 를 대체
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = cookies().get('x-token')?.value;

  if (!token) {
    redirect('/');
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<User>(queryKeys.USER_DATA, () =>
    userService.getMy(token)
  );

  return (
    <DashboardProviders dehydratedState={dehydrate(queryClient)}>
      {children}
    </DashboardProviders>
  );
};

export default DashboardLayout;
