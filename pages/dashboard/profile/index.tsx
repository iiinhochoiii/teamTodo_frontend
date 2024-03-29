import React from 'react';
import { DashboardTemplates } from '@/components/templates';
import AuthHOC from '@/hoc/authHOC';
import { DashboardProfileComponent } from '@/components/templates';
import { ProfileHeader } from '@/components/organisms';

const Profile = AuthHOC(() => {
  return (
    <DashboardTemplates header={<ProfileHeader />}>
      <DashboardProfileComponent />
    </DashboardTemplates>
  );
});

export default Profile;
