import React from 'react';
import type { Metadata } from 'next';
import {
  DashboardTemplates,
  DashboardComposeComponent,
} from '@/components/templates';

export const metadata: Metadata = {
  title: 'Compose',
};

const ComposePage = () => {
  return (
    <DashboardTemplates>
      <DashboardComposeComponent />
    </DashboardTemplates>
  );
};

export default ComposePage;
