import React from 'react';
import {
  DashboardTemplates,
  DashboardTodosComponent,
} from '@/components/templates';

const Todos = () => {
  return (
    <DashboardTemplates>
      <DashboardTodosComponent />
    </DashboardTemplates>
  );
};

export default Todos;
