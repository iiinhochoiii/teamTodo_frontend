import React from 'react';
import type { NextPage } from 'next';
import { HomeTemplates, MainComponent } from '@/components/templates';
import HomeHOC from '@/hoc/homeHOC';

const Home: NextPage = HomeHOC(() => {
  return (
    <HomeTemplates>
      <MainComponent />
    </HomeTemplates>
  );
});

export default Home;
