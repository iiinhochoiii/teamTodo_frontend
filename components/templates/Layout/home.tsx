import React from 'react';
import Head from 'next/head';
import { Header, Footer } from '@/components/organisms';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const HomeTemplates = (props: Props) => {
  const { children, title } = props;

  return (
    <div>
      <Head>{title || 'Team Todo'}</Head>
      <Header />
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeTemplates;
