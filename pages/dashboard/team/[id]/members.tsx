import React from 'react';
import {
  DashboardTemplates,
  TeamMembersComponent,
} from '@/components/templates';
import { TeamHeader } from '@/components/organisms';

const TeamHome = () => {
  return (
    <DashboardTemplates header={<TeamHeader />}>
      <TeamMembersComponent />
    </DashboardTemplates>
  );
};

export default TeamHome;
