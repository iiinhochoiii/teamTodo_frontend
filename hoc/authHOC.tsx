import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import Router from 'next/router';
import { User } from '@/interfaces/models/user';
import { QueryClient, dehydrate } from 'react-query';
import { getMy } from '@/apis/user';
import useUsersData from '@/hooks/queries/user/useUsersData';
import * as queryKeys from '@/constants/queryKeys';
import { useUserStore } from '@/stores/useUserStore';

const WrapComponent = (TargetComponent: any) => {
  const AuthHOC = ({ props }: any): JSX.Element => {
    const { dehydratedState } = props;
    const { data } = useUsersData();
    const { setUserInfo } = useUserStore();

    useEffect(() => {
      const { queries } = dehydratedState;
      if (queries.length > 0 && queries[0]?.queryKey === queryKeys.USER_DATA) {
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

    await queryClient.prefetchQuery<User>(queryKeys.USER_DATA, () =>
      getMy(token)
    );

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
