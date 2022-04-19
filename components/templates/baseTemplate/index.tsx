import React from 'react';
import Head from 'next/head';
import { Header } from '@/components/organisms';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const BaseTemplates = (props: Props) => {
  const { children, title } = props;

  return (
    <div>
      <Head>{title || 'Team Todo'}</Head>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default BaseTemplates;
