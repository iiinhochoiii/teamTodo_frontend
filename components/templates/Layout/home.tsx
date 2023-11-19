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
      <Head>
        <title>{title || 'Team Todo'}</title>
        <meta
          name="description"
          content={
            'TeamTodo는 실시간으로 어떤 업무를 진행하는지 공유를 하여 더욱 효율적으로 협업을 할 수 있도록 도와줍니다.'
          }
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title || 'Team Todo'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={'https://todo.iiinho.me'} />
        <meta property="og:article:author" content="Team Todo" />
        <meta property="og:image" content={'/images/set-teams.png'} />
      </Head>
      <Header />
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeTemplates;
