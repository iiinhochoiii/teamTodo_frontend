import React from 'react';
import { DashboardTemplates } from '@/components/templates';
import AuthHOC from '@/hoc/authHOC';
import { DashboardProfileComponent } from '@/components/templates';
import {
  ProfileHeader,
  ProfileInformationContent,
} from '@/components/organisms';

const ProfileInformation = AuthHOC(() => {
  return (
    <DashboardTemplates header={<ProfileHeader />}>
      <DashboardProfileComponent content={<ProfileInformationContent />} />
    </DashboardTemplates>
  );
});

export default ProfileInformation;
