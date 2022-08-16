import React from 'react';
import {
  DashboardTemplates,
  TeamCreateComponent,
} from '@/components/templates';
import AuthHOC from '@/hoc/authHOC';

const teamCreate = AuthHOC(() => {
  return (
    <DashboardTemplates title="Create New Team">
      <TeamCreateComponent />
    </DashboardTemplates>
  );
});

export default teamCreate;
