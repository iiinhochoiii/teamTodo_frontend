import React from 'react';
import type { Metadata } from 'next';
import {
  DashboardTemplates,
  TeamDirectoryComponent,
} from '@/components/templates';
import { TeamDirectoryHeader } from '@/components/organisms';

export const metadata: Metadata = {
  title: 'Team Directory',
};

const TeamDirectoryPage = () => {
  return (
    <DashboardTemplates header={<TeamDirectoryHeader />}>
      <TeamDirectoryComponent />
    </DashboardTemplates>
  );
};

export default TeamDirectoryPage;
