import React from 'react';
import {
  DashboardTemplates,
  TeamMembersComponent,
} from '@/components/templates';
import { TeamHeader } from '@/components/organisms';
import AuthHOC from '@/hoc/authHOC';

const TeamHome = AuthHOC(() => {
  return (
    <DashboardTemplates header={<TeamHeader />}>
      <TeamMembersComponent />
    </DashboardTemplates>
  );
});

export default TeamHome;
