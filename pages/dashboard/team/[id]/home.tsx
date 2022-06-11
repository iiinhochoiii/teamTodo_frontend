import React from 'react';
import { DashboardTemplates, TeamHomeComponent } from '@/components/templates';
import { TeamHeader } from '@/components/organisms';

const TeamHome = () => {
  return (
    <DashboardTemplates header={<TeamHeader />}>
      <TeamHomeComponent />
    </DashboardTemplates>
  );
};

export default TeamHome;
