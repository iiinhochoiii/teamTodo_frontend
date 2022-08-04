import React, { useContext, useEffect } from 'react';
import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import Router from 'next/router';
import axios from '@/utils/axios';
import { User } from '@/interfaces/models/user';
import { AppContext } from '@/contexts';

const WrapComponent = (TargetComponent: any) => {
  const AuthHOC = (props: { userInfo: User }): JSX.Element => {
    const { userInfo } = props;
    const { setUserInfo } = useContext(AppContext);

    useEffect(() => {
      setUserInfo(userInfo);
    }, []);

    return <TargetComponent />;
  };

  AuthHOC.getInitialProps = async ({ ...ctx }: NextPageContext) => {
    const token = cookies(ctx)['x-token'];
    let userInfo = undefined;

    if (token) {
      try {
        const [res] = await Promise.all([
          axios.get('/users/my', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        userInfo = res.data;
      } catch (err) {
        console.log(err);
      }
    } else {
      if (ctx.req && ctx.res) {
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
      } else {
        Router.push('/');
      }
    }

    return {
      userInfo,
    };
  };

  return AuthHOC;
};

export default WrapComponent;
