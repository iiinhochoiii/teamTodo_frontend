import React, { useEffect, useContext } from 'react';
import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import Router from 'next/router';
import { User } from '@/interfaces/models/user';
import { AppContext } from '@/contexts';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { getMy } from '@/apis/user';

const WrapComponent = (TargetComponent: any) => {
  const AuthHOC = (): JSX.Element => {
    const { data } = useQuery('users', getMy);
    const { setUserInfo } = useContext(AppContext);

    useEffect(() => {
      if (data) {
        setUserInfo(data);
      }
    }, [data]);

    return <TargetComponent />;
  };

  AuthHOC.getInitialProps = async ({ ...ctx }: NextPageContext) => {
    const token = cookies(ctx)['x-token'];
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<User>(['users'], getMy);

    if (!token) {
      if (ctx.req && ctx.res) {
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
      } else {
        Router.push('/');
      }
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };

  return AuthHOC;
};

export default WrapComponent;
