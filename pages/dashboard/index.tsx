import React from 'react';
import { DashboardTemplates, DashboardComponent } from '@/components/templates';
import AuthHOC from '@/hoc/authHOC';

const DashboardPage = AuthHOC(() => {
  return (
    <DashboardTemplates>
      <DashboardComponent />
    </DashboardTemplates>
  );
});

export default DashboardPage;
