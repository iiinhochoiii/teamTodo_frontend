import React from 'react';
import { AuthHeader } from '@/components/molecules';
import * as S from './style';

interface Props {
  children?: React.ReactNode;
}

const BaseTemplates = (props: Props) => {
  const { children } = props;

  return (
    <div>
      <AuthHeader />
      <S.StyledMain>{children}</S.StyledMain>
    </div>
  );
};

export default BaseTemplates;
