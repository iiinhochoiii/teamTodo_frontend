import React from 'react';
import { DashboardTemplates, TeamHomeComponent } from '@/components/templates';
import { TeamHeader } from '@/components/organisms';
import AuthHOC from '@/hoc/authHOC';

const TeamHome = AuthHOC(() => {
  return (
    <DashboardTemplates header={<TeamHeader />}>
      <TeamHomeComponent />
    </DashboardTemplates>
  );
});

export default TeamHome;
