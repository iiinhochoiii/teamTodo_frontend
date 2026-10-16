import React from 'react';
import type { Metadata } from 'next';
import {
  DashboardTemplates,
  TeamCreateComponent,
} from '@/components/templates';

export const metadata: Metadata = {
  title: 'Create New Team',
};

const TeamCreatePage = () => {
  return (
    <DashboardTemplates title="Create New Team">
      <TeamCreateComponent />
    </DashboardTemplates>
  );
};

export default TeamCreatePage;
