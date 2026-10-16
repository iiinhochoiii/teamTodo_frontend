import React from 'react';
import type { Metadata } from 'next';
import { DashboardTemplates, DashboardComponent } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Home',
};

const DashboardPage = () => {
  return (
    <DashboardTemplates>
      <DashboardComponent />
    </DashboardTemplates>
  );
};

export default DashboardPage;
