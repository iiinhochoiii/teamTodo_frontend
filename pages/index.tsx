import React from 'react';
import type { NextPage } from 'next';
import { HomeTemplates, MainComponent } from '@/components/templates';
import { getToken } from '@/utils/token';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const token = getToken();

  if (token) {
    router.push('/dashboard');
  }

  return (
    <HomeTemplates>
      <MainComponent />
    </HomeTemplates>
  );
};

export default Home;
