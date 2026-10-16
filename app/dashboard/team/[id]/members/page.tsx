import React from 'react';
import type { Metadata } from 'next';
import {
  DashboardTemplates,
  TeamMembersComponent,
} from '@/components/templates';
import { TeamHeader } from '@/components/organisms';
import { safeDecodeURIComponent } from '@/utils/url';

interface Props {
  params: { id: string };
}

export const generateMetadata = ({ params }: Props): Metadata => ({
  title: `${safeDecodeURIComponent(params.id)} Members`,
});

const TeamMembersPage = () => {
  return (
    <DashboardTemplates header={<TeamHeader />}>
      <TeamMembersComponent />
    </DashboardTemplates>
  );
};

export default TeamMembersPage;
