import React from 'react';
import type { Metadata } from 'next';
import {
  DashboardTemplates,
  DashboardProfileComponent,
} from '@/components/templates';
import {
  ProfileHeader,
  ProfileInformationContent,
} from '@/components/organisms';

export const metadata: Metadata = {
  title: 'Profile Information',
};

const ProfileInformationPage = () => {
  return (
    <DashboardTemplates header={<ProfileHeader />}>
      <DashboardProfileComponent content={<ProfileInformationContent />} />
    </DashboardTemplates>
  );
};

export default ProfileInformationPage;
