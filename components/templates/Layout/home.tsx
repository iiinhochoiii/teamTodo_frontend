import React from 'react';
import { Header, Footer } from '@/components/organisms';

interface Props {
  children?: React.ReactNode;
}

const HomeTemplates = (props: Props) => {
  const { children } = props;

  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeTemplates;
