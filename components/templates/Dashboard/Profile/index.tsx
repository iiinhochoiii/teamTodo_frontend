import React from 'react';
import * as S from './style';
import { ProfileTabHeader } from '@/components/organisms';

interface Props {
  content?: React.ReactNode;
}

const ProfileComponent = (props: Props) => {
  const { content } = props;
  return (
    <S.Container>
      <ProfileTabHeader />
      {content}
    </S.Container>
  );
};

export default ProfileComponent;
