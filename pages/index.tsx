import React from 'react';
import type { NextPage } from 'next';
import { HomeTemplates, MainComponent } from '@/components/templates';

const Home: NextPage = () => {
  return (
    <HomeTemplates>
      <MainComponent />
    </HomeTemplates>
  );
};

export default Home;
