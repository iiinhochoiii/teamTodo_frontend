import React from 'react';
import type { Metadata } from 'next';
import {
  DashboardTemplates,
  DashboardProfileComponent,
} from '@/components/templates';
import { ProfileHeader, ProfilePasswordContent } from '@/components/organisms';

export const metadata: Metadata = {
  title: 'Profile Password',
};

const ProfilePasswordPage = () => {
  return (
    <DashboardTemplates header={<ProfileHeader />}>
      <DashboardProfileComponent content={<ProfilePasswordContent />} />
    </DashboardTemplates>
  );
};

export default ProfilePasswordPage;
