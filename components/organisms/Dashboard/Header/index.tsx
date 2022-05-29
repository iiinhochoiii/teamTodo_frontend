import React from 'react';
import * as S from './style';

interface Props {
  title?: string;
}

const DashboardHeader = (props: Props) => {
  const { title } = props;

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.HeaderText>{title || ''}</S.HeaderText>
        <S.HeaderBadge />
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default DashboardHeader;
