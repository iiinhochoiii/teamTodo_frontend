import React from 'react';
import {
  DashboardTemplates,
  DashboardComposeComponent,
} from '@/components/templates';
import AuthHOC from '@/hoc/authHOC';

const Compose = AuthHOC(() => {
  return (
    <DashboardTemplates>
      <DashboardComposeComponent />
    </DashboardTemplates>
  );
});

export default Compose;
