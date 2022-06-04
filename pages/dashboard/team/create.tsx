import React from 'react';
import {
  DashboardTemplates,
  TeamCreateComponent,
} from '@/components/templates';

const teamCreate = () => {
  return (
    <DashboardTemplates title="Create New Team">
      <TeamCreateComponent />
    </DashboardTemplates>
  );
};

export default teamCreate;
