import { NextPageContext } from 'next';
import React from 'react';
import cookies from 'next-cookies';
import Router from 'next/router';

const WrapComponent = (TargetComponent: any) => {
  const HomeHOC = (): JSX.Element => {
    return <TargetComponent />;
  };

  HomeHOC.getInitialProps = async ({ ...ctx }: NextPageContext) => {
    const token = cookies(ctx)['x-token'];

    if (token) {
      if (ctx.req && ctx.res) {
        ctx.res.writeHead(302, { Location: '/dashboard' });
        ctx.res.end();
      } else {
        Router.push('/dashboard');
      }
    }

    return {
      token,
    };
  };

  return HomeHOC;
};

export default WrapComponent;
