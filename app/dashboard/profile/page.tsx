import React from 'react';
import type { Metadata } from 'next';
import {
  DashboardTemplates,
  DashboardProfileComponent,
} from '@/components/templates';
import { ProfileHeader } from '@/components/organisms';

export const metadata: Metadata = {
  title: 'Profile',
};

const ProfilePage = () => {
  return (
    <DashboardTemplates header={<ProfileHeader />}>
      <DashboardProfileComponent />
    </DashboardTemplates>
  );
};

export default ProfilePage;
