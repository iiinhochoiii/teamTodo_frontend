import React from 'react';
import { DashboardTemplates } from '@/components/templates';
import { TeamHeader } from '@/components/organisms';

const TeamHome = () => {
  return (
    <DashboardTemplates header={<TeamHeader />}>
      dashboard team home component
    </DashboardTemplates>
  );
};

export default TeamHome;
