import React from 'react';
import type { Metadata } from 'next';
import {
  DashboardTemplates,
  DashboardTodosComponent,
} from '@/components/templates';

export const metadata: Metadata = {
  title: 'Todos',
};

const TodosPage = () => {
  return (
    <DashboardTemplates>
      <DashboardTodosComponent />
    </DashboardTemplates>
  );
};

export default TodosPage;
