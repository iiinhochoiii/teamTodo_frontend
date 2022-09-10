import React from 'react';
import { DashboardTemplates } from '@/components/templates';
import AuthHOC from '@/hoc/authHOC';
import { DashboardProfileComponent } from '@/components/templates';
import { ProfileHeader, ProfilePasswordContent } from '@/components/organisms';

const ProfilePassword = AuthHOC(() => {
  return (
    <DashboardTemplates header={<ProfileHeader />}>
      <DashboardProfileComponent content={<ProfilePasswordContent />} />
    </DashboardTemplates>
  );
});

export default ProfilePassword;
