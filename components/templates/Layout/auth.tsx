import React from 'react';
import Head from 'next/head';
import { AuthHeader } from '@/components/molecules';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const BaseTemplates = (props: Props) => {
  const { children, title } = props;

  return (
    <div>
      <Head>{title || 'Team Todo'}</Head>
      <AuthHeader />
      <main>{children}</main>
    </div>
  );
};

export default BaseTemplates;
