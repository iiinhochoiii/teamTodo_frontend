import React from 'react';
import type { Metadata } from 'next';
import { DashboardTemplates, TeamHomeComponent } from '@/components/templates';
import { TeamHeader } from '@/components/organisms';
import { safeDecodeURIComponent } from '@/utils/url';

interface Props {
  params: { id: string };
}

export const generateMetadata = ({ params }: Props): Metadata => ({
  title: safeDecodeURIComponent(params.id),
});

const TeamHomePage = () => {
  return (
    <DashboardTemplates header={<TeamHeader />}>
      <TeamHomeComponent />
    </DashboardTemplates>
  );
};

export default TeamHomePage;
