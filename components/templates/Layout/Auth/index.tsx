import React from 'react';
import Head from 'next/head';
import { AuthHeader } from '@/components/molecules';
import * as S from './style';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const BaseTemplates = (props: Props) => {
  const { children, title } = props;

  return (
    <div>
      <Head>{title || 'Team Todo'}</Head>
      <AuthHeader />
      <S.StyledMain>{children}</S.StyledMain>
    </div>
  );
};

export default BaseTemplates;
