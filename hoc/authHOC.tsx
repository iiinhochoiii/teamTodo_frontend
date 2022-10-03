import React, { useEffect, useContext } from 'react';
import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import Router from 'next/router';
import { User } from '@/interfaces/models/user';
import { AppContext } from '@/contexts';
import { QueryClient, dehydrate } from 'react-query';
import { getMy } from '@/apis/user';
import useUsersData from '@/hooks/queries/user/useUsersData';

const WrapComponent = (TargetComponent: any) => {
  const AuthHOC = ({ props }: any): JSX.Element => {
    const { dehydratedState } = props;
    const { data } = useUsersData();
    const { setUserInfo } = useContext(AppContext);

    useEffect(() => {
      const { queries } = dehydratedState;
      if (queries.length > 0 && queries[0]?.queryKey === 'users') {
        setUserInfo(queries[0]?.state?.data);
      } else {
        if (data) {
          setUserInfo(data);
        }
      }
    }, [data, dehydratedState]);

    return <TargetComponent />;
  };

  AuthHOC.getInitialProps = async ({ ...ctx }: NextPageContext) => {
    const token = cookies(ctx)['x-token'];
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<User>('users', () => getMy(token));

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
